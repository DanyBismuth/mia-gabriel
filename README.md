# 💍 Site de mariage juif — Template personnalisable

Un site de mariage élégant, pensé pour les couples juifs,
entièrement configurable via un seul fichier.

---

## ⚡ Livrer un site en 1h — Les 5 étapes

### 1. Dupliquer le projet
```bash
cp -r wedding-template mon-mariage-dupont
cd mon-mariage-dupont
npm install
```

### 2. Modifier `src/config/wedding.config.js`
C'est **le seul fichier à toucher** pour personnaliser le site.

| Champ | Description |
|---|---|
| `bride` / `groom` | Prénoms des mariés |
| `date` | Date ISO (`2026-09-13`) |
| `dateHebrew` | Date hébraïque en caractères hébreux |
| `tradition` | `"sephardic"` / `"ashkenazi"` / `"mizrahi"` |
| `venue` | Lieu, adresse, lien Maps, cacheroût |
| `colors` | Palette complète (primary, secondary, background...) |
| `program` | Étapes de la journée (heure, nom FR + hébreu, icône) |
| `ourStory` | Timeline (année, titre, texte, photo) |
| `accommodations` | Hôtels recommandés |
| `faq` | Questions/réponses |
| `rsvp` | Date limite, menus, clés EmailJS |

### 3. Remplacer les images
Déposer dans `public/images/` :

```
hero.jpg       ← Photo plein écran Hero (recommandé : 1920×1080, > 500 Ko)
couple.jpg     ← Photo du couple
venue.jpg      ← Photo du lieu
s1.jpg → s4.jpg  ← Photos "Notre histoire"
g1.jpg → g6.jpg  ← Galerie
hotel1.jpg → hotel3.jpg  ← Photos hébergements
```

> **Conseil :** Optimiser les images avec [Squoosh](https://squoosh.app) ou `imagemagick` avant de les déposer.

### 4. Configurer EmailJS (formulaire RSVP)
1. Créer un compte sur [emailjs.com](https://www.emailjs.com)
2. Ajouter un service email (Gmail, Outlook, etc.)
3. Créer un template avec les variables : `from_name`, `attending`, `guest_count`, `menu`, `allergies`, `plus_one`, `houpa`, `dinner`, `kids_count`, `message`
4. Renseigner dans `wedding.config.js` :
```js
rsvp: {
  emailjsServiceId:  "service_xxxxxxx",
  emailjsTemplateId: "template_xxxxxxx",
  emailjsPublicKey:  "xxxxxxxxxxxxxxxx",
}
```

### 5. Déployer
```bash
npm run build
# Le dossier /dist est prêt à déployer

# Option A — Vercel (recommandé)
vercel --prod

# Option B — GitHub Pages
npm run build && gh-pages -d dist

# Option C — Upload FTP manuel
# Uploader le contenu de /dist sur votre hébergeur
```

---

## 🏗️ Architecture

```
/src
  /config
    wedding.config.js    ← SEUL fichier à modifier
  /components
    Navigation.jsx       ← Barre de nav sticky + menu mobile
    Hero.jsx             ← Plein écran + countdown + dates
    OurStory.jsx         ← Timeline animée
    Program.jsx          ← Programme rituel juif accordéon
    Venue.jsx            ← Lieu + carte Google Maps
    Accommodations.jsx   ← Hôtels avec badge Shabbat
    RSVP.jsx             ← Formulaire complet (EmailJS)
    FAQ.jsx              ← Accordéon questions
    Gallery.jsx          ← Masonry + lightbox
    Footer.jsx           ← Pied de page avec citation
  /pages
    Home.jsx
  App.jsx
  main.jsx
  index.css
/public
  /images                ← Vos photos ici
  favicon.svg
```

---

## 🎨 Personnaliser la palette

La palette est entièrement configurable dans `wedding.config.js` :

```js
colors: {
  primary:    "#C9A96E",  // or champagne → plus chaud pour séfarade
  secondary:  "#8FAF8F",  // vert sauge
  background: "#FAF8F5",  // ivoire
  text:       "#2C2C2C",
  accent:     "#E8D5A3",  // or clair
}
```

**Suggestions par tradition :**
- 🟡 **Séfarade** : `primary: "#D4A847"` (or chaud) + fond ivoire chaud
- ⚪ **Ashkénaze** : `primary: "#8B9BA8"` (gris bleuté) + fond blanc cassé
- 🟠 **Mizrahi** : `primary: "#C0652B"` (terracotta) + `secondary: "#8B6914"` (bronze)

---

## 📅 Calculer la date hébraïque

Utiliser [hebcal.com](https://www.hebcal.com/converter) pour convertir une date grégorienne en date hébraïque et obtenir le texte en caractères hébreux.

---

## 🔤 Textes hébreux

Tous les textes hébreux utilisent :
- **Font** : Frank Ruhl Libre (chargée depuis Google Fonts)
- **Direction** : `dir="rtl"` sur chaque élément hébreu
- **Attribut langue** : `lang="he"`

---

## 🛠️ Commandes

```bash
npm run dev      # Serveur de développement (http://localhost:5173)
npm run build    # Build de production (→ /dist)
npm run preview  # Prévisualiser le build
```

---

## 📦 Stack technique

- **React 18** + **Vite 5**
- **Tailwind CSS 3** — styling utility-first
- **Framer Motion 11** — animations fluides
- **React Router 6** — routing / ancres
- **EmailJS** — envoi RSVP sans backend
- **Frank Ruhl Libre** — typographie hébraïque

---

*Template créé avec ❤️ pour les mariages juifs.*
