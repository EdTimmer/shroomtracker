const mushrooms = [
  {
    _id: 1,
    commonname: "Fly Agaric",
    latinname: "Amanita muscaria",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/2006-10-25_Amanita_muscaria_crop.jpg/1280px-2006-10-25_Amanita_muscaria_crop.jpg",
    imageCredit: "By Amanita_muscaria_3_vliegenzwammen_op_rij.jpg: Onderwijsgekderivative work: Ak ccm - This file was derived from: Amanita muscaria 3 vliegenzwammen op rij.jpg:, CC BY-SA 3.0 nl, https://commons.wikimedia.org/w/index.php?curid=21983879"
  },
  {
    _id: 2,
    commonname: "Destroying Angel",
    latinname: "Amanita virosa, A. verna, A. bisporigera",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Destroying_Angel_02.jpg/1024px-Destroying_Angel_02.jpg",
    imageCredit: "By en:User:Ben DeRoy - en:Image:Destroying Angel 02.jpg, Public Domain, https://commons.wikimedia.org/w/index.php?curid=2356834"
  },
  {
    _id: 3,
    commonname: "The Omnipresent Laccaria",
    latinname: "Laccaria bicolor",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Laccaria%2C_DOE.jpg",
    imageCredit: ""
  },
  {
    _id: 4,
    commonname: "Aspen Bolete",
    latinname: "Leccinum aurantiacum, L. insigne",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Leccinum_insigne_98865.jpg",
    imageCredit: "By © Hans Hillewaert, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=11628616"
  },
  {
    _id: 5,
    commonname: "Birch Bolete",
    latinname: "Leccinum scabrum",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Leccinum_scabrum_JPG7.jpg/1280px-Leccinum_scabrum_JPG7.jpg",
    imageCredit: "By Jean-Pol GRANDMONT - Own work, CC BY 3.0, https://commons.wikimedia.org/w/index.php?curid=3356279"
  },
  {
    _id: 6,
    commonname: "Morel (Sponge Mushroom)",
    latinname: "Morchella esculenta",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Morchella_esculenta_-_DE_-_TH_-_2013-05-01_-_01.JPG/800px-Morchella_esculenta_-_DE_-_TH_-_2013-05-01_-_01.JPG",
    imageCredit: "By TOMMES-WIKI - Own work, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=27753655"
  },
  {
    _id: 7,
    commonname: "Honey Mushroom",
    latinname: "Armillaria gallica",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Armillaria_gallica_26659.jpg/1024px-Armillaria_gallica_26659.jpg",
    imageCredit: "By This image was created by user Dan Molter (shroomydan) at Mushroom Observer, a source for mycological images.You can contact this user here. - This image is Image Number 26659 at Mushroom Observer, a source for mycological images., CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=9496908"
  },
  {
    _id: 8,
    commonname: "Giant Puffball",
    latinname: "Calvatia gigantea",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Calvatia_gigantea.jpg/1280px-Calvatia_gigantea.jpg",
    imageCredit: "By © Hans Hillewaert, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=15504239"
  },
  {
    _id: 9,
    commonname: "Inky Caps",
    latinname: "Coprinus, Coprinellus, Coprinopsis spp.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/30/Coprinopsis_atramentaria_3_-_Lindsey.jpg",
    imageCredit: "By James Lindsey at Ecology of Commanster, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=3565711"
  },
  {
    _id: 10,
    commonname: "Slippery Jack Bolete",
    latinname: "Suillus luteus",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Suillus_luteus_475376.jpg/1024px-Suillus_luteus_475376.jpg",
    imageCredit: "By walt sturgeon (Mycowalt) - This image is Image Number 475376 at Mushroom Observer, a source for mycological images., CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=42098084"
  },
  {
    _id: 11,
    commonname: "White Pine Bolete",
    latinname: "Suillus americanus",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Suillus_americanus_61328.jpg/1024px-Suillus_americanus_61328.jpg",
    imageCredit: "By This image was created by user Dan Molter (shroomydan) at Mushroom Observer, a source for mycological images.You can contact this user here. - This image is Image Number 61328 at Mushroom Observer, a source for mycological images., CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=9240010"
  },
  {
    _id: 12,
    commonname: "The King Bolete",
    latinname: "Boletus edulis",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Boletus_edulis_EtgHollande_041031_091.jpg/1024px-Boletus_edulis_EtgHollande_041031_091.jpg",
    imageCredit: "CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=179148"
  },
  {
    _id: 13,
    commonname: "False Morel",
    latinname: "Gyromitra esculenta",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Fr%C3%BChjahrslorchel.JPG/800px-Fr%C3%BChjahrslorchel.JPG",
    imageCredit: "CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=124790"
  },
  {
    _id: 14,
    commonname: "Golden Chanterelle",
    latinname: "Cantharellus cibarius",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Chanterelle_Cantharellus_cibarius.jpg/1024px-Chanterelle_Cantharellus_cibarius.jpg",
    imageCredit: "CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=191739"
  },
  {
    _id: 15,
    commonname: "Gassy Webcap",
    latinname: "Cortinarius traganus",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/2012-10-19_Cortinarius_traganus_%28Fr.%29_Fr_273917.jpg/1024px-2012-10-19_Cortinarius_traganus_%28Fr.%29_Fr_273917.jpg",
    imageCredit: "By This image was created by user Ron Pastorino (Ronpast) at Mushroom Observer, a source for mycological images.You can contact this user here. - This image is Image Number 273917 at Mushroom Observer, a source for mycological images., CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=22274091"
  },
  {
    _id: 16,
    commonname: "False Chanterelle",
    latinname: "Hygrophoropsis aurantiaca",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Hygrophoropsis_aurantiaca_241718.jpg/1024px-Hygrophoropsis_aurantiaca_241718.jpg",
    imageCredit: "By walt sturgeon (Mycowalt) - This image is Image Number 241718 at Mushroom Observer, a source for mycological images., CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=45144195"
  },
  {
    _id: 17,
    commonname: "Witches Hat",
    latinname: "Hygrocybe conica(Hygrophorous conicus)",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Hygrocybe_conica_%282005_11_07%29_1.jpg/800px-Hygrocybe_conica_%282005_11_07%29_1.jpg",
    imageCredit: "By No machine-readable author provided. Taka assumed (based on copyright claims). - No machine-readable source provided. Own work assumed (based on copyright claims)., CC BY 2.5, https://commons.wikimedia.org/w/index.php?curid=496534"
  },
  {
    _id: 18,
    commonname: "Club Coral",
    latinname: "Clavariadelphus ligula",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Clavariadelphus_ligula_47695.jpg/1024px-Clavariadelphus_ligula_47695.jpg",
    imageCredit: "By This image was created by user Daryl Thompson (woobs) at Mushroom Observer, a source for mycological images.You can contact this user here. - This image is Image Number 47695 at Mushroom Observer, a source for mycological images., CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=11374907"
  },
  {
    _id: 19,
    commonname: "Humongous Fungus",
    latinname: "Armillaria solidipes (A. ostoyae)",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Armillaria_ostoyae.jpg",
    imageCredit: "By W.J.Pilsak, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=167753"
  },

  {
    _id: 20,
    commonname: "Truffle Eater",
    latinname: "Cordyceps ophioglossoides",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/53/Elaphocordyceps.ophioglossoides.-.lindsey.jpg",
    imageCredit: "By James Lindsey at Ecology of Commanster, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=7207271"
  },
  {
    _id: 21,
    commonname: "Hollow Stem Larch",
    latinname: "Suillus cavipes",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Boletus_cavipes.jpg/1280px-Boletus_cavipes.jpg",
    imageCredit: "By Dezidor - Own work, CC BY 3.0, https://commons.wikimedia.org/w/index.php?curid=2840197"
  },
  {
    _id: 22,
    commonname: "Short-Stemmed Russula",
    latinname: "Russula brevipes",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Russula_brevipes.JPG/1024px-Russula_brevipes.JPG",
    imageCredit: "By The High Fin Sperm Whale - Self-photographed, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=12035032"
  },
  {
    _id: 23,
    commonname: "Swamp Death Angel",
    latinname: "Amanita brunnescens",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Amanita_brunnescens.jpg/800px-Amanita_brunnescens.jpg",
    imageCredit: "By Joseph O'Brien - This image is Image Number 5047052 at Forestry Images, a source for forest health, natural resources and silviculture images operated by The Bugwood Network at the University of Georgia and the USDA Forest Service., CC BY 3.0, https://commons.wikimedia.org/w/index.php?curid=3769445"
  },
  {
    _id: 24,
    commonname: "Larch Suillus",
    latinname: "Suillus grevillei",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Suill.grev.jpg/1024px-Suill.grev.jpg",
    imageCredit: "By User:Luridiformis, CC BY 3.0, https://commons.wikimedia.org/w/index.php?curid=41200152"
  },
  {
    _id: 25,
    commonname: "Tent Stakes",
    latinname: "Gomphidius glutinosus",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Gomphidius_glutinosus_131007.jpg/800px-Gomphidius_glutinosus_131007.jpg",
    imageCredit: "By Bernd Haynold - Self-photographed, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=2908348"
  },
  {
    _id: 26,
    commonname: "Hedgehog Mushroom",
    latinname: "Hydnum repandum (Dentinum repandum)",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Hedgehog_fungi2.jpg",
    imageCredit: "By D J Kelly - Own work, Public Domain, https://commons.wikimedia.org/w/index.php?curid=1328791"
  },
  {
    _id: 27,
    commonname: "Milky Caps",
    latinname: "Lactarius volemus",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Lactarius_volemus_54887.jpg/1024px-Lactarius_volemus_54887.jpg",
    imageCredit: "By This image was created by user Dan Molter (shroomydan) at Mushroom Observer, a source for mycological images.You can contact this user here. - This image is Image Number 54887 at Mushroom Observer, a source for mycological images., CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=9822537"
  },
  {
    _id: 28,
    commonname: "Emetic Russula",
    latinname: "Russula emetica",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Russula_emetica_in_Poland.jpg/800px-Russula_emetica_in_Poland.jpg",
    imageCredit: "By MichalPL - Own work, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=63737437"
  },
  {
    _id: 29,
    commonname: "Coral Fungus",
    latinname: "Clavicorona pyxidata",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Artomyces_pyxidatus_45278.jpg/1280px-Artomyces_pyxidatus_45278.jpg",
    imageCredit: "By hríb - This image is Image Number 45278 at Mushroom Observer, a source for mycological images., CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=7986905"
  },
];

// imageCredit: "By Amanita_muscaria_3_vliegenzwammen_op_rij.jpg: Onderwijsgekderivative work: Ak ccm - This file was derived from: Amanita muscaria 3 vliegenzwammen op rij.jpg:, CC BY-SA 3.0 nl, https://commons.wikimedia.org/w/index.php?curid=21983879"

module.exports = mushrooms;
