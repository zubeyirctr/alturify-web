// DRAFT — standard boilerplate only. Must be reviewed and approved by a
// qualified lawyer before this is treated as the company's real privacy
// policy. The Data Controller section intentionally lists only a contact
// email for now — add legal name/address/registry number once registered.
import type { LegalDocumentByLanguage } from './types'

export const privacyPolicy: LegalDocumentByLanguage = {
  tr: {
    title: 'Gizlilik Politikası',
    lastUpdated: 'Son güncelleme: 10 Temmuz 2026',
    sections: [
      {
        heading: '1. Giriş ve Kapsam',
        paragraphs: [
          'Bu Gizlilik Politikası, Alturify ("biz", "bize", "Alturify") tarafından işletilen web sitesini ("Site") ziyaret eden ve/veya Site üzerinden bizimle iletişime geçen kullanıcılara ("siz") ait kişisel verilerin nasıl toplandığını, işlendiğini, saklandığını ve korunduğunu açıklamak amacıyla hazırlanmıştır.',
          'Siteyi kullanarak bu Gizlilik Politikası\'nda açıklanan uygulamaları kabul etmiş olursunuz. Bu metni kabul etmiyorsanız, lütfen Siteyi kullanmayınız.',
        ],
      },
      {
        heading: '2. Veri Sorumlusu',
        paragraphs: [
          'Kişisel verileriniz, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") ve ilgili mevzuat kapsamında veri sorumlusu sıfatıyla aşağıdaki bilgilere sahip şirket tarafından işlenmektedir:',
        ],
        list: ['E-posta: info@alturify.com'],
      },
      {
        heading: '3. Toplanan Kişisel Veriler',
        paragraphs: [
          'Site üzerindeki iletişim formunu doldurduğunuzda veya bizimle randevu talebi oluşturduğunuzda aşağıdaki veri kategorilerini işleyebiliriz:',
        ],
        list: [
          'Kimlik bilgileri: ad, soyad',
          'İletişim bilgileri: e-posta adresi',
          'İşlem güvenliği bilgileri: form içeriği (karşılaştığınız sorun ve beklediğiniz çözüm alanlarına yazdığınız serbest metin), gönderim zamanı',
          'Görüşme talebi oluşturursanız: seçtiğiniz tarih ve saat bilgisi',
        ],
      },
      {
        heading: '4. Verilerin Toplanma Yöntemi ve Hukuki Sebebi',
        paragraphs: [
          'Kişisel verileriniz, Site üzerindeki iletişim formu ve randevu talebi aracılığıyla, doğrudan sizin tarafınızdan sağlanan bilgiler olarak elektronik ortamda toplanmaktadır.',
          'Bu veriler; KVKK m.5/2(c) "bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması" ve m.5/2(f) "ilgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla veri sorumlusunun meşru menfaati için veri işlenmesinin zorunlu olması" hukuki sebeplerine dayanılarak; GDPR\'nin uygulandığı hâllerde ise Madde 6(1)(a) (açık rıza) ve Madde 6(1)(f) (meşru menfaat) hukuki sebeplerine dayanılarak işlenmektedir.',
        ],
      },
      {
        heading: '5. Verilerin İşlenme Amaçları',
        list: [
          'Talebinizi değerlendirmek ve sizinle iletişime geçmek',
          'Ücretsiz süreç analizi / keşif görüşmesi planlamak',
          'Sunduğumuz hizmetler hakkında bilgi vermek',
          'Hizmet kalitemizi ölçmek ve geliştirmek',
          'Yasal yükümlülüklerimizi yerine getirmek',
        ],
      },
      {
        heading: '6. Verilerin Paylaşılması ve Aktarılması',
        paragraphs: [
          'Kişisel verileriniz, yasal zorunluluklar dışında üçüncü kişilerle paylaşılmaz veya satılmaz.',
          'Sitenin teknik altyapısı Vercel Inc. üzerinde barındırılmaktadır; bu kapsamda Site trafiğine ilişkin teknik veriler (ör. IP adresi, tarayıcı bilgisi) barındırma hizmeti sağlayıcımız tarafından işlenebilir. Ayrıca, Site tipografisi için Google Fonts üzerinden yazı tipleri yüklenmektedir; bu isteklerde tarayıcınızın IP adresi Google\'a iletilebilir. Bu aktarımlar hizmetin teknik olarak sunulabilmesi için zorunludur ve ilgili sağlayıcıların kendi gizlilik politikalarına tabidir.',
          'Verileriniz, yetkili kamu kurum ve kuruluşları tarafından usulüne uygun şekilde talep edilmesi hâlinde ilgili mevzuat kapsamında paylaşılabilir.',
        ],
      },
      {
        heading: '7. Verilerin Saklanma Süresi',
        paragraphs: [
          'Kişisel verileriniz, işlenme amacının gerektirdiği süre boyunca ve ilgili mevzuatta öngörülen zamanaşımı süreleri saklı kalmak kaydıyla, işleme amacı ortadan kalktığında silinir, yok edilir veya anonim hâle getirilir.',
        ],
      },
      {
        heading: '8. Veri Güvenliği',
        paragraphs: [
          'Kişisel verilerinizin güvenliğini sağlamak amacıyla makul teknik ve idari tedbirler alınmaktadır (ör. şifreli bağlantılar üzerinden veri iletimi). Ancak internet üzerinden hiçbir iletim yönteminin veya elektronik saklama yönteminin %100 güvenli olmadığını belirtmek isteriz.',
        ],
      },
      {
        heading: '9. Çerezler',
        paragraphs: [
          'Site üzerinde kullanılan çerezlere ilişkin ayrıntılı bilgi için lütfen Çerez Politikamızı inceleyiniz.',
        ],
      },
      {
        heading: '10. KVKK Madde 11 ve GDPR Kapsamındaki Haklarınız',
        paragraphs: [
          'KVKK\'nın 11. maddesi ve (uygulandığı ölçüde) GDPR uyarınca aşağıdaki haklara sahipsiniz:',
        ],
        list: [
          'Kişisel verilerinizin işlenip işlenmediğini öğrenme',
          'İşlenmişse buna ilişkin bilgi talep etme',
          'İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme',
          'Yurt içinde/yurt dışında aktarıldığı üçüncü kişileri bilme',
          'Eksik/yanlış işlenmişse düzeltilmesini isteme',
          'KVKK m.7 şartları çerçevesinde silinmesini/yok edilmesini isteme',
          'Düzeltme/silme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme',
          'İşlenen verilerin münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme',
          'Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme',
        ],
      },
      {
        heading: '11. Başvuru Yöntemi',
        paragraphs: [
          'Yukarıdaki haklarınızı kullanmak için taleplerinizi info@alturify.com adresine e-posta yoluyla iletebilirsiniz. Talebiniz, niteliğine göre en kısa sürede ve en geç yasal azami süre içinde ücretsiz olarak sonuçlandırılır.',
        ],
      },
      {
        heading: '12. Değişiklikler',
        paragraphs: [
          'Bu Gizlilik Politikası, yasal düzenlemelerdeki veya iş uygulamalarımızdaki değişikliklere bağlı olarak zaman zaman güncellenebilir. Güncel sürüm her zaman bu sayfada yayınlanır.',
        ],
      },
      {
        heading: '13. İletişim',
        paragraphs: ['Sorularınız için bize info@alturify.com adresinden ulaşabilirsiniz.'],
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: July 10, 2026',
    sections: [
      {
        heading: '1. Introduction and Scope',
        paragraphs: [
          'This Privacy Policy explains how Alturify ("we", "us", "Alturify") collects, uses, stores, and protects the personal data of visitors to, and users of, our website (the "Site").',
          'By using the Site, you agree to the practices described in this Privacy Policy. If you do not agree, please do not use the Site.',
        ],
      },
      {
        heading: '2. Data Controller',
        paragraphs: [
          'Your personal data is processed by the following company acting as data controller under Turkey\'s Law on the Protection of Personal Data No. 6698 ("KVKK") and, where applicable, the EU General Data Protection Regulation ("GDPR"):',
        ],
        list: ['Email: info@alturify.com'],
      },
      {
        heading: '3. Personal Data We Collect',
        paragraphs: [
          'When you fill out the contact form or request a call on the Site, we may process the following categories of data:',
        ],
        list: [
          'Identity data: first and last name',
          'Contact data: email address',
          'Correspondence data: the free-text content you submit (the problem you are facing and the solution you expect), and the submission timestamp',
          'If you book a call: your selected date and time',
        ],
      },
      {
        heading: '4. How Data Is Collected and Its Legal Basis',
        paragraphs: [
          'Your personal data is collected electronically, directly from you, through the contact form and appointment request on the Site.',
          'This data is processed on the basis of KVKK Art. 5/2(c) (necessary for the performance of a contract) and Art. 5/2(f) (necessary for our legitimate interests, provided your fundamental rights are not harmed); where GDPR applies, the legal bases are Art. 6(1)(a) (consent) and Art. 6(1)(f) (legitimate interest).',
        ],
      },
      {
        heading: '5. Purposes of Processing',
        list: [
          'Evaluating your request and getting in touch with you',
          'Scheduling a free process audit / discovery call',
          'Providing information about our services',
          'Measuring and improving our service quality',
          'Meeting our legal obligations',
        ],
      },
      {
        heading: '6. Sharing and Transfer of Data',
        paragraphs: [
          'We do not sell your personal data and do not share it with third parties except as described below or as legally required.',
          'The Site is hosted on Vercel Inc.\'s infrastructure; technical traffic data (e.g. IP address, browser information) may be processed by our hosting provider as part of delivering the Site. The Site also loads fonts from Google Fonts, which may receive your browser\'s IP address as part of that request. These transfers are necessary to technically deliver the Site and are governed by each provider\'s own privacy policy.',
          'Your data may be shared with competent public authorities where lawfully requested under applicable law.',
        ],
      },
      {
        heading: '7. Data Retention',
        paragraphs: [
          'Your personal data is retained only for as long as necessary for the purpose it was collected for, subject to any applicable statutory retention periods, after which it is deleted, destroyed, or anonymized.',
        ],
      },
      {
        heading: '8. Data Security',
        paragraphs: [
          'We take reasonable technical and administrative measures to protect your personal data (e.g. encrypted data transmission). No method of transmission over the internet or electronic storage is, however, 100% secure.',
        ],
      },
      {
        heading: '9. Cookies',
        paragraphs: [
          'For details on the cookies used on the Site, please see our Cookie Policy.',
        ],
      },
      {
        heading: '10. Your Rights (KVKK Art. 11 / GDPR)',
        paragraphs: ['Under KVKK Art. 11 and, where applicable, the GDPR, you have the right to:'],
        list: [
          'Learn whether your personal data is being processed',
          'Request information if it has been processed',
          'Learn the purpose of processing and whether it is used in line with that purpose',
          'Know the third parties, domestic or foreign, to whom your data is transferred',
          'Request correction of incomplete or inaccurate data',
          'Request deletion or destruction of your data under the conditions set out in KVKK Art. 7',
          'Request that any correction or deletion be notified to third parties your data was shared with',
          'Object to a result that is to your detriment arising from analysis of your data exclusively through automated systems',
          'Claim compensation if you are harmed due to unlawful processing',
        ],
      },
      {
        heading: '11. How to Exercise Your Rights',
        paragraphs: [
          'You can exercise the rights above by emailing your request to info@alturify.com. We will respond as soon as possible and, at the latest, within the maximum period required by applicable law, free of charge.',
        ],
      },
      {
        heading: '12. Changes to This Policy',
        paragraphs: [
          'We may update this Privacy Policy from time to time to reflect changes in law or in our business practices. The current version is always published on this page.',
        ],
      },
      {
        heading: '13. Contact',
        paragraphs: ['If you have any questions, contact us at info@alturify.com.'],
      },
    ],
  },
}
