# Alturify — Logo Kiti (Konsept 2: Loop)

## Renk paleti
| Renk | HEX | RGB | Kullanım |
|---|---|---|---|
| Kömür grisi | `#22282E` | 34,40,46 | Ana logo rengi, metin |
| Adaçayı yeşili | `#7F9E92` | 127,158,146 | Vurgu (ok + düğüm) |
| Sis grisi | `#B9C6C1` | 185,198,193 | İkincil / koyu zeminde tagline |
| Kum beji | `#EFEAE3` | 239,234,227 | Arka plan |

Font: **Poppins Medium** (wordmark) + **Poppins Regular** (tagline).
Tüm vektör dosyalarında yazı **outline'a çevrilmiştir** — font kurulu olmayan bilgisayarda da bozulmaz.

## Klasörler
- `01-vektor-svg/` — Ana kaynak dosyalar. Illustrator/Figma'da açıp düzenleyebilirsin.
- `02-web/` — Sitene koyacakların (SVG + favicon + OG image).
- `03-instagram/` — Instagram için hazır PNG'ler.
- `04-png-genel/` — Sunum, doküman, matbaa için şeffaf PNG'ler.

## Web sitesi kurulumu
Favicon dosyalarını sitenin kök dizinine at, sonra `<head>` içine:

```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180.png">
<meta property="og:image" content="https://alturify.com/og-image-1200x630.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```

Header logosu:
```html
<a href="/" class="logo">
  <img src="/alturify-yatay.svg" alt="Alturify" width="180" height="48">
</a>
```
```css
.logo img { height: 36px; width: auto; display: block; }
@media (max-width: 640px) { .logo img { height: 28px; } }
```
> SVG kullan. 2 KB, her ekranda net, retina sorunu yok.

## Instagram
| Dosya | Nereye |
|---|---|
| `profil-fotografi-1080.png` | Profil fotoğrafı — **sadece sembol**, daire kırpmada güvenli |
| `post-1080x1080.png` | Feed gönderisi |
| `story-1080x1920.png` | Story / Reels kapağı |
| `highlight-kapak-1080x1920.png` | Öne çıkanlar kapağı (koyu zemin) |
| `yatay-logo-seffaf-2000.png` | Canva/Figma'da tasarımlara bindirmek için |

**Uyarı:** Instagram SVG kabul etmez, profil fotoğrafını daireye kırpar. Profil için asla yatay lockup (sembol + yazı) kullanma — kenarları kesilir.

## Kullanım kuralları
- **Güvenli alan:** Logonun her yanında en az sembol yüksekliğinin yarısı kadar boşluk bırak.
- **Minimum boyut:** Yatay lockup en az 120 px genişlik. Daha küçüğünde sadece sembolü kullan.
- Logoyu esnetme, döndürme, gölge/gradient ekleme, renklerini değiştirme.
- Koyu zeminde `alturify-yatay-koyu-zemin.svg` kullan.
- Tek renk baskıda (kaşe, fatura, damga) mono siyah/beyaz versiyonları kullan.
