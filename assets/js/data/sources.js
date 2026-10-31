/** Bibliography, team and image credits. */

export const TEAM = ['Անի Շահոյան', 'Արսեն Սողոմոնյան', 'Կարինա Կարագյոզյան', 'Սերգեյ Ներսեսյան'];

export const BIBLIOGRAPHY = [
  {
    group: 'Գրքեր և հոդվածներ',
    items: [
      {
        text: 'Bedoukian, P. Z. (1978). Coinage of the Artaxiads of Armenia. Royal Numismatic Society Special Publication No. 10. London.',
        note: 'Կայքում օգտագործված «Bed» համարները այս կատալոգից են։',
      },
      {
        text: 'Foss, C. (1986). The Coinage of Tigranes the Great: Problems, Suggestions and a New Find. The Numismatic Chronicle, 146, 19–66.',
        url: 'https://www.jstor.org/stable/42667454',
      },
      {
        text: 'Gurzadyan, V. G., & Vardanyan, R. (2004). Halley’s comet of 87 BC on the coins of Armenian king Tigranes? Astronomy & Geophysics, 45(4), 4.6.',
        url: 'https://arxiv.org/abs/physics/0405073',
      },
      {
        text: 'Vardanyan, R., & Vardanyan, K. (2008). Newly-Found Groups of Artaxiad Copper Coins.',
        url: 'https://www.researchgate.net/publication/278036546_Newly-Found_Groups_of_Artaxiad_Copper_Coins',
      },
      {
        text: 'Kovacs, F. L. (2016). Armenian Coinage in the Classical Period. Classical Numismatic Group.',
        note: 'Ավելի նոր դասակարգում, որի վրա հիմնված է ANRO կայքը։',
      },
      {
        text: 'Տոնապետյան (1971). Արտաշէս Ա.ի պղինձէ դրամը, էջ 135–144։',
      },
      {
        text: 'Տոնապետյան (1982–84). Արտաւազդ Գ. Արտաշէսեանի դրամահատութիւնը, էջ 193–202։',
        url: 'https://arar.sci.am/dlibra/publication/311989/edition/286604/content',
      },
      {
        text: 'Ներսիսյան (1999). Տիգրան Բ Մեծ եւ Դամասկոսի դրամահատարանը, էջ 155–170։',
      },
      {
        text: 'Վարդանյան, Ռ. Արտավազդ II-ի դրամները։',
        url: 'https://arar.sci.am/dlibra/publication/407098/edition/376209/content',
      },
      { text: 'Տիգրան Մեծի դրամները (ARAR թվային գրադարան)։', url: 'https://arar.sci.am/dlibra/publication/313748/edition/288516/content' },
      { text: 'Արտաշես Ա-ի դրամը (ARAR թվային գրադարան)։', url: 'https://arar.sci.am/dlibra/publication/309947/edition/284174/content' },
    ],
  },
  {
    group: 'Կայքեր և տեսանյութեր',
    items: [
      {
        text: 'Armenian Numismatic Research Organization (ANRO). Browse Archive: Armenia Major.',
        url: 'https://armnumres.org/collection-tree',
      },
      {
        text: 'ՀՀ կենտրոնական բանկ. Հայաստանի դրամաշրջանառության պատմություն։',
        url: 'https://old.cba.am/am/sitepages/achmoneycyclefirstmention.aspx',
      },
      { text: 'Արտաշատ. Մոռացված մայրաքաղաքը Մետաքսի ճանապարհի վրա (վավերագրական ֆիլմ)։' },
      { text: 'ԴՐԱՄԱՊԱՏՈՒՄ. Հայոց դրամաշրջանառության պատմությունը (վավերագրական ֆիլմ)։' },
    ],
  },
];

/**
 * Image credits. `scan` images come from the team's working document; the
 * rest are freely licensed photographs from Wikimedia Commons.
 */
export const CREDITS = {
  bedoukian: {
    label: 'Bedoukian (1978)-ի սկան, թիմի փաստաթղթից',
  },
  'team-doc': {
    label: 'Թիմի փաստաթղթից',
  },
  'vardanyan-groups': {
    label: 'Vardanyan & Vardanyan (2008), թիմի փաստաթղթից',
  },
  'vardanyan-artavazd': {
    label: 'Ռ. Վարդանյան, «Արտավազդ II-ի դրամները», թիմի փաստաթղթից',
  },
  'leu-artaxias': {
    label: 'Leu Numismatik',
    license: 'CC BY-SA 4.0',
    url: 'https://commons.wikimedia.org/wiki/File:Artaxias_I_earliest_coin.jpg',
  },
  'leu-artaxias-series': {
    label: 'Leu Numismatik',
    license: 'CC BY-SA 4.0',
    url: 'https://commons.wikimedia.org/wiki/File:Coins_of_Artaxias.png',
  },
  'cng-tigran1': {
    label: 'Classical Numismatic Group',
    license: 'CC BY-SA 3.0',
    url: 'https://commons.wikimedia.org/wiki/File:Coin_of_the_Artaxiad_king_Tigranes_I.jpg',
  },
  'bnf-antioch': {
    label: 'Bibliothèque nationale de France',
    license: 'Հանրային սեփականություն',
    url: 'https://commons.wikimedia.org/wiki/File:Monnaie_-_T%C3%A9tradrachme,_Argent,_Antioche,_Arm%C3%A9nie,_Tigrane_Le_Grand_-_btv1b8496815m_(1_of_2).jpg',
  },
  'bnf-damascus': {
    label: 'Bibliothèque nationale de France',
    license: 'CC0',
    url: 'https://commons.wikimedia.org/wiki/File:Tetradrachm_Tigranes_II_minted_in_Damascus.jpg',
  },
  'bnf-drachm': {
    label: 'Bibliothèque nationale de France',
    license: 'CC0',
    url: 'https://commons.wikimedia.org/wiki/File:Tetradrachm_Tigranes_II.jpg',
  },
  'cng-comet': {
    label: 'Classical Numismatic Group',
    license: 'CC BY-SA 3.0',
    url: 'https://commons.wikimedia.org/wiki/File:Coin_of_Tigranes_the_Younger,_Tigranocerta_mint.jpg',
  },
  'cng-artavazd2-drachm': {
    label: 'Classical Numismatic Group',
    license: 'CC BY-SA 3.0',
    url: 'https://commons.wikimedia.org/wiki/File:Coin_of_the_Artaxiad_monarch_Artavasdes_II,_minted_at_Artaxata.jpg',
  },
  'cng-artavazd2-copper': {
    label: 'Classical Numismatic Group',
    license: 'CC BY-SA 4.0',
    url: 'https://commons.wikimedia.org/wiki/File:KINGS_of_ARMENIA._Artavasdes_II.jpg',
  },
  artagigarta: {
    label: 'Wikimedia Commons',
    license: 'CC BY-SA 2.5',
    url: 'https://commons.wikimedia.org/wiki/File:Chalkoi_from_Artagigarta,_Pompeian_Era_54-3_BC.jpg',
  },
  'artashes2-drachm': {
    label: 'Wikimedia Commons',
    license: 'CC BY-SA 2.5',
    url: 'https://commons.wikimedia.org/wiki/File:Drachm_of_Artaxias_II.jpg',
  },
  tigran3: {
    label: 'Wikimedia Commons',
    license: 'CC BY-SA 4.0',
    url: 'https://commons.wikimedia.org/wiki/File:Tigranes_III.jpg',
  },
  'cng-tigran4': {
    label: 'Classical Numismatic Group',
    license: 'CC BY-SA 3.0',
    url: 'https://commons.wikimedia.org/wiki/File:Coin_of_Tigranes_IV_of_Armenia,_Artaxata_mint.jpg',
  },
  'bnf-erato': {
    label: 'Bibliothèque nationale de France',
    license: 'CC0',
    url: 'https://commons.wikimedia.org/wiki/File:Tigranes_IV_and_Erato.jpg',
  },
  tokhatyan: {
    label: 'Կարեն Թոխաթյան',
    license: 'CC BY-SA 4.0',
    url: 'https://commons.wikimedia.org/wiki/File:Tigran_IV_%26_Erato,_Ararat,_1_BC_-_1_AD.jpg',
  },
  'cng-devicta': {
    label: 'Classical Numismatic Group',
    license: 'CC BY-SA 2.5',
    url: 'https://commons.wikimedia.org/wiki/File:Mark_Antony_%26_Cleopatra,_denarius,_34_BC,_543-1.jpg',
  },
  'cng-capta': {
    label: 'Classical Numismatic Group',
    license: 'CC BY-SA 2.5',
    url: 'https://commons.wikimedia.org/wiki/File:Augustus_denarius_Armenia_90020170.jpg',
  },
  'cng-recepta': {
    label: 'Classical Numismatic Group',
    license: 'CC BY-SA 2.5',
    url: 'https://commons.wikimedia.org/wiki/File:Augustus_ARMENIA_RECEPTA.jpg',
  },
  'portrait-artaxias': {
    label: 'Armineaghayan',
    license: 'CC BY-SA 3.0',
    url: 'https://commons.wikimedia.org/wiki/File:Artashat,_Artashes_(2).jpg',
  },
  'portrait-artavazd1': {
    label: 'Ժան Ֆուզարո կամ Ջուզեպպե Կանելլա',
    license: 'CC BY-SA 4.0',
    url: 'https://commons.wikimedia.org/wiki/File:Artavasdes_I_falling_into_the_cave_of_Masis.jpg',
  },
  'portrait-tigran2': {
    label: 'Wikimedia Commons',
    license: 'Հանրային սեփականություն',
    url: 'https://commons.wikimedia.org/wiki/File:Tigranes_2.jpg',
  },
  'portrait-artavazd2': {
    label: "O'micron",
    license: 'CC BY-SA 4.0',
    url: 'https://commons.wikimedia.org/wiki/File:Artavasdes_II,_king_of_Armenia.png',
  },
};
