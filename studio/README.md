# Conforcus Blog — Sanity Studio

Blog yazılarını yazıp düzenlediğiniz yönetim paneli. Next.js sitesinden bağımsızdır;
site içeriği yalnızca okur (ISR). Proje: **bl5w7h11**, dataset: **production**.

## Kurulum (bir kez)

```bash
cd studio
npm install
npx sanity login        # tarayıcıda Sanity hesabınıza giriş yapın
```

## Yerelde içerik girmek

```bash
npm run dev             # http://localhost:3333 — panel açılır
```

## Paneli yayına almak (hosted)

```bash
npx sanity deploy       # studio adresi sorulur, ör. "conforcus"
# → https://conforcus.sanity.studio
```

## Önemli

- **Veri kümesini "public" yapın** ki site okuyabilsin:
  https://www.sanity.io/manage → bl5w7h11 → Datasets → production → Visibility: **Public**.
  (Özel tutmak isterseniz site tarafında bir okuma token'ı gerekir.)
- İlk yazıyı girerken `author` (Yazar) belgesi de oluşturup yazıya bağlayın.
- Yayınladığınız yazı sitede en geç 60 sn içinde görünür (anında istiyorsanız
  REVALIDATE_SECRET + webhook kurulur).
