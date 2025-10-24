import React, { useState, useEffect, useRef } from 'react';
import { Heart, X, MessageCircle, ArrowLeft, Moon, Sun, Send } from 'lucide-react';

const DeliTipleri = [
  { tip: "Romantik Deli", emoji: "🌹", hakkinda: ["Aşkı yıldızlarda arıyorum", "Ay'a mektup yazarım akşamları", "Sevgilim olur musun? (3. kez soruyorum)"] },
  { tip: "Felsefi Deli", emoji: "🧠", hakkinda: ["Varoluş acısı çekiyorum ama mutluyum", "Sokrates benim kuzenim", "Düşünüyorum, o yüzden deliyim"] },
  { tip: "Esprili Deli", emoji: "😂", hakkinda: ["Her şeye gülerim, hatta ağlarken bile", "Komik miyim? Hayır, deliyim!", "Espri yaparken düşünmem bile"] },
  { tip: "Sakin Deli", emoji: "😌", hakkinda: ["Sessizce delilik yapıyorum", "Sakinim ama içimde fırtınalar var", "Yoga yaparken hayal görürüm"] },
  { tip: "Dans Eden Deli", emoji: "💃", hakkinda: ["Durmadan dans ediyorum, müzik olmasa da", "Ritim bedenimde yaşıyor", "Süpermarkette bile takla atarım"] },
  { tip: "Yemek Delisi", emoji: "🍕", hakkinda: ["Tostla konuşurum bazen", "Yemek tarifleri rüyama giriyor", "Pizza benim ruh eşim"] },
  { tip: "Teknoloji Delisi", emoji: "💻", hakkinda: ["Binary kodla düşünürüm", "WiFi olmadan yaşayamam", "Telefonuma aşığım olabilir miyim?"] },
  { tip: "Müzik Delisi", emoji: "🎵", hakkinda: ["Kulaklıklarım vücuduma yapışık", "Her yerde şarkı söylerim", "Müzik benim dilim, konuşma değil"] },
  { tip: "Hayvan Sever Deli", emoji: "🐱", hakkinda: ["Kedilerle telepati kuruyorum", "12 hayali köpeğim var", "Martılarla arkadaşım"] },
  { tip: "Gece Kuşu Deli", emoji: "🦉", hakkinda: ["Sabah 5'te uyurum", "Güneş benim düşmanım", "Ay ışığında yürüyorum"] }
];

const OtomatikMesajlar = [
  "Ben de tostla konuşurum! Seninki kaşarlı mı?",
  "Bugün hiç bulutlara baktın mı? Ben bir kedi gördüm.",
  "Peki ama gerçekten gerçek miyiz yoksa simülasyon mu?",
  "Sabah kahvaltısında ne yedin? Ben hayal ettim sadece.",
  "Dans ediyor musun şu an? Çünkü ben ediyorum!",
  "Ay'a gidelim mi birlikte? Roketim garajda.",
  "Sence penguenler uçabilir mi ama sadece kimse bakmıyorken?",
  "Hayatın anlamını buldum! Ama unuttum... Sen biliyor musun?",
  "Şu an bir şarkı söylüyorum ama sen duyamıyorsun.",
  "Pizza veya makarna? Bu çok derin bir soru aslında.",
  "Telepatik mesaj gönderiyorum... Aldın mı?",
  "Bazen duvarlara konuşuyorum, onlar da cevap veriyor!",
  "Paralel evrende seninle zaten arkadaşız galiba.",
  "Bugün kaç kere düşündün? Ben 47 kere.",
  "Seviyorum seni! Yani... Tost seviyorum demek istedim.",
  "Gece 3'te uyanıp egzistansiyel kriz geçiriyor musun?",
  "Müzik dinlerken zaman yolculuğu yapabiliyorum.",
  "Sence bulutlar yumuşak mı yoksa sadece öyle mi görünüyor?",
  "Rüyamda seninle tanışmıştık galiba... Ya da başka biriydi.",
  "Her şey güzel olacak! ...Belki de olmayacak. Kim bilir?"
];

const App = () => {
  const [ekran, setEkran] = useState('giris');
  const [kullaniciAdi, setKullaniciAdi] = useState('');
  const [karanlikMod, setKaranlikMod] = useState(false);
  const [profiller, setProfiller] = useState([]);
  const [aktifProfil, setAktifProfil] = useState(null);
  const [eslesiler, setEslesiler] = useState([]);
  const [aktifSohbet, setAktifSohbet] = useState(null);
  const [mesaj, setMesaj] = useState('');
  const [sohbetler, setSohbetler] = useState({});
  const sohbetSonuRef = useRef(null);

  useEffect(() => {
    const kaydedilmisKullanici = localStorage.getItem('kullaniciAdi');
    const kaydedilmisEslesiler = localStorage.getItem('eslesiler');
    const kaydedilmisSohbetler = localStorage.getItem('sohbetler');
    
    if (kaydedilmisKullanici) {
      setKullaniciAdi(kaydedilmisKullanici);
    }
    if (kaydedilmisEslesiler) {
      setEslesiler(JSON.parse(kaydedilmisEslesiler));
    }
    if (kaydedilmisSohbetler) {
      setSohbetler(JSON.parse(kaydedilmisSohbetler));
    }
  }, []);

  useEffect(() => {
    if (sohbetSonuRef.current) {
      sohbetSonuRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [sohbetler, aktifSohbet]);

  const profilOlustur = () => {
    const yeniProfiller = [];
    for (let i = 0; i < 20; i++) {
      const deliTipi = DeliTipleri[Math.floor(Math.random() * DeliTipleri.length)];
      const isimler = ["Deli", "Manyak", "Kaçık", "Absürt", "Garip", "Tuhaf", "Şizoid", "Psikopat", "Kaotik", "Ruh"];
      const soyisimler = ["Ali", "Ayşe", "Mehmet", "Zeynep", "Ahmet", "Fatma", "Mustafa", "Emine", "Hüseyin", "Hatice"];
      const rastgeleIsim = isimler[Math.floor(Math.random() * isimler.length)] + soyisimler[Math.floor(Math.random() * soyisimler.length)] + Math.floor(Math.random() * 100);
      
      yeniProfiller.push({
        id: Date.now() + i,
        isim: rastgeleIsim,
        tip: deliTipi.tip,
        emoji: deliTipi.emoji,
        hakkinda: deliTipi.hakkinda[Math.floor(Math.random() * deliTipi.hakkinda.length)]
      });
    }
    setProfiller(yeniProfiller);
    setAktifProfil(0);
  };

  const girisYap = () => {
    if (kullaniciAdi.trim()) {
      localStorage.setItem('kullaniciAdi', kullaniciAdi);
      profilOlustur();
      setEkran('profiller');
    }
  };

  const profilBegen = () => {
    const eslesme = Math.random() > 0.3;
    if (eslesme) {
      const yeniEslesen = profiller[aktifProfil];
      const yeniEslesiler = [...eslesiler, yeniEslesen];
      setEslesiler(yeniEslesiler);
      localStorage.setItem('eslesiler', JSON.stringify(yeniEslesiler));
      
      setTimeout(() => {
        alert(`🎉 Eşleşme! ${yeniEslesen.isim} ile eşleştin! Artık sohbet edebilirsin!`);
      }, 300);
    }
    
    if (aktifProfil < profiller.length - 1) {
      setAktifProfil(aktifProfil + 1);
    } else {
      alert('Profiller bitti! Yeni profiller yükleniyor...');
      profilOlustur();
    }
  };

  const profilGec = () => {
    if (aktifProfil < profiller.length - 1) {
      setAktifProfil(aktifProfil + 1);
    } else {
      alert('Profiller bitti! Yeni profiller yükleniyor...');
      profilOlustur();
    }
  };

  const sohbetAc = (profil) => {
    setAktifSohbet(profil);
    setEkran('sohbet');
    
    if (!sohbetler[profil.id]) {
      const yeniSohbetler = {
        ...sohbetler,
        [profil.id]: [
          { gonderen: 'karsi', mesaj: `Merhaba! Ben ${profil.isim}. ${profil.hakkinda} 😄` }
        ]
      };
      setSohbetler(yeniSohbetler);
      localStorage.setItem('sohbetler', JSON.stringify(yeniSohbetler));
    }
  };

  const mesajGonder = () => {
    if (mesaj.trim() && aktifSohbet) {
      const yeniMesajlar = [
        ...(sohbetler[aktifSohbet.id] || []),
        { gonderen: 'ben', mesaj: mesaj }
      ];
      
      const yeniSohbetler = {
        ...sohbetler,
        [aktifSohbet.id]: yeniMesajlar
      };
      setSohbetler(yeniSohbetler);
      setMesaj('');
      
      setTimeout(() => {
        const otomatikCevap = OtomatikMesajlar[Math.floor(Math.random() * OtomatikMesajlar.length)];
        const guncelSohbetler = {
          ...yeniSohbetler,
          [aktifSohbet.id]: [...yeniMesajlar, { gonderen: 'karsi', mesaj: otomatikCevap }]
        };
        setSohbetler(guncelSohbetler);
        localStorage.setItem('sohbetler', JSON.stringify(guncelSohbetler));
      }, 1000 + Math.random() * 2000);
    }
  };

  const bgColor = karanlikMod ? 'bg-gray-900' : 'bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100';
  const cardBg = karanlikMod ? 'bg-gray-800' : 'bg-white';
  const textColor = karanlikMod ? 'text-white' : 'text-gray-800';

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-8 max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            SohbetEdecekDeliBul.com
          </h1>
          <button
            onClick={() => setKaranlikMod(!karanlikMod)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {karanlikMod ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>

        <p className="text-center text-sm mb-4 opacity-75">
          💪💅 Transcıabi ile Destekleniyor
        </p>

        {ekran === 'giris' && (
          <div className={`${cardBg} rounded-3xl shadow-2xl p-8`}>
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🤪</div>
              <h2 className="text-2xl font-bold mb-2">Hoş Geldin Deli!</h2>
              <p className="text-sm opacity-75">En yakın "deli"ni bulmaya hazır mısın?</p>
            </div>
            
            <input
              type="text"
              placeholder="Takma adını yaz..."
              value={kullaniciAdi}
              onChange={(e) => setKullaniciAdi(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && girisYap()}
              className={`w-full p-4 rounded-xl border-2 mb-4 ${karanlikMod ? 'bg-gray-700 border-gray-600' : 'border-purple-300'} focus:outline-none focus:border-purple-500 transition`}
            />
            
            <button
              onClick={girisYap}
              disabled={!kullaniciAdi.trim()}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-bold hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Deli Avına Başla! 🎯
            </button>

            <div className="mt-8 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-xl text-xs text-center">
              ⚠️ Bu site tamamen eğlencelik bir simülasyondur. Kişisel bilgi paylaşmayın!
            </div>
          </div>
        )}

        {ekran === 'profiller' && profiller.length > 0 && aktifProfil < profiller.length && (
          <div>
            <div className="flex justify-between mb-4">
              <button
                onClick={() => setEkran('eslesiler')}
                className={`${cardBg} px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:scale-105 transition`}
              >
                <MessageCircle className="w-5 h-5" />
                Eşleşmeler ({eslesiler.length})
              </button>
            </div>

            <div className={`${cardBg} rounded-3xl shadow-2xl p-8 text-center mb-6 transform transition-all hover:scale-105`}>
              <div className="text-8xl mb-4">{profiller[aktifProfil].emoji}</div>
              <h2 className="text-3xl font-bold mb-2">{profiller[aktifProfil].isim}</h2>
              <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full mb-4">
                {profiller[aktifProfil].tip}
              </div>
              <p className="text-lg opacity-75 italic">"{profiller[aktifProfil].hakkinda}"</p>
            </div>

            <div className="flex justify-center gap-6">
              <button
                onClick={profilGec}
                className="bg-red-500 text-white p-6 rounded-full shadow-2xl hover:scale-110 transition"
              >
                <X className="w-8 h-8" />
              </button>
              <button
                onClick={profilBegen}
                className="bg-green-500 text-white p-6 rounded-full shadow-2xl hover:scale-110 transition"
              >
                <Heart className="w-8 h-8" />
              </button>
            </div>

            <p className="text-center mt-6 text-sm opacity-75">
              Kalan profil: {profiller.length - aktifProfil - 1}
            </p>
          </div>
        )}

        {ekran === 'eslesiler' && (
          <div>
            <button
              onClick={() => setEkran('profiller')}
              className={`${cardBg} px-4 py-2 rounded-full shadow-lg flex items-center gap-2 mb-4 hover:scale-105 transition`}
            >
              <ArrowLeft className="w-5 h-5" />
              Geri Dön
            </button>

            <h2 className="text-2xl font-bold mb-4">Eşleşmelerim 💕</h2>

            {eslesiler.length === 0 ? (
              <div className={`${cardBg} rounded-3xl shadow-lg p-8 text-center`}>
                <div className="text-6xl mb-4">😢</div>
                <p className="opacity-75">Henüz eşleşmen yok. Profillere bakmaya devam et!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {eslesiler.map((profil) => (
                  <div
                    key={profil.id}
                    onClick={() => sohbetAc(profil)}
                    className={`${cardBg} rounded-2xl shadow-lg p-4 flex items-center gap-4 cursor-pointer hover:scale-105 transition`}
                  >
                    <div className="text-5xl">{profil.emoji}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{profil.isim}</h3>
                      <p className="text-sm opacity-75">{profil.tip}</p>
                    </div>
                    <MessageCircle className="w-6 h-6 text-purple-500" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {ekran === 'sohbet' && aktifSohbet && (
          <div className="flex flex-col h-[calc(100vh-200px)]">
            <div className={`${cardBg} rounded-t-3xl shadow-lg p-4 flex items-center gap-4`}>
              <button
                onClick={() => setEkran('eslesiler')}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="text-4xl">{aktifSohbet.emoji}</div>
              <div>
                <h3 className="font-bold">{aktifSohbet.isim}</h3>
                <p className="text-xs opacity-75">{aktifSohbet.tip}</p>
              </div>
            </div>

            <div className={`${cardBg} flex-1 overflow-y-auto p-4 space-y-3`}>
              {(sohbetler[aktifSohbet.id] || []).map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.gonderen === 'ben' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl ${
                      msg.gonderen === 'ben'
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                        : karanlikMod ? 'bg-gray-700' : 'bg-gray-200'
                    }`}
                  >
                    {msg.mesaj}
                  </div>
                </div>
              ))}
              <div ref={sohbetSonuRef} />
            </div>

            <div className={`${cardBg} rounded-b-3xl shadow-lg p-4 flex gap-2`}>
              <input
                type="text"
                placeholder="Mesajını yaz..."
                value={mesaj}
                onChange={(e) => setMesaj(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && mesajGonder()}
                className={`flex-1 p-3 rounded-xl border-2 ${karanlikMod ? 'bg-gray-700 border-gray-600' : 'border-purple-300'} focus:outline-none focus:border-purple-500 transition`}
              />
              <button
                onClick={mesajGonder}
                disabled={!mesaj.trim()}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-3 rounded-xl hover:scale-105 transition disabled:opacity-50"
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
