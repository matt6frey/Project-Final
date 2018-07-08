const fs = require('fs');
const curl = require('tiny-curl');
// const express = require('express');

const images = [
  { id: 1, name: "apple ", type: "fruit"  },
  { id: 2, name: "apricot ", type: "fruit"  },
  { id: 3, name: "avocado ", type: "fruit"  },
  { id: 4, name: "banana", type: "fruit"  },
  { id: 5, name: "bilberry", type: "fruit"  },
  { id: 6, name: "blackberry", type: "fruit"  },
  { id: 7, name: "blackcurrant", type: "fruit"  },
  { id: 8, name: "blood orange", type: "fruit"  },
  { id: 9, name: "blueberry ", type: "fruit"  },
  { id: 10 , name: "boysenberry ", type: "fruit"  },
  { id: 11 , name: "buddha's hand ", type: "fruit"  },
  { id: 12 , name: "cantaloupe", type: "fruit"  },
  { id: 13 , name: "cherimoya ", type: "fruit"  },
  { id: 14 , name: "cherry", type: "fruit"  },
  { id: 15 , name: "chico fruit ", type: "fruit"  },
  { id: 16 , name: "chili pepper", type: "fruit"  },
  { id: 17 , name: "clementine", type: "fruit"  },
  { id: 18 , name: "cloudberry", type: "fruit"  },
  { id: 19 , name: "coconut ", type: "fruit"  },
  { id: 20 , name: "corn kernel ", type: "fruit"  },
  { id: 21 , name: "crab apples ", type: "fruit"  },
  { id: 22 , name: "cranberry ", type: "fruit"  },
  { id: 23 , name: "cucumber", type: "fruit"  },
  { id: 24 , name: "currant ", type: "fruit"  },
  { id: 25 , name: "custard apple ", type: "fruit"  },
  { id: 26 , name: "damson", type: "fruit"  },
  { id: 27 , name: "date palm|date", type: "fruit"  },
  { id: 28 , name: "dragonfruit ", type: "fruit"  },
  { id: 29 , name: "dried plum", type: "fruit"  },
  { id: 30 , name: "durian", type: "fruit"  },
  { id: 31 , name: "eggplant", type: "fruit"  },
  { id: 32 , name: "elderberry", type: "fruit"  },
  { id: 33 , name: "feijoa", type: "fruit"  },
  { id: 34 , name: "fig ", type: "fruit"  },
  { id: 35 , name: "fingered citron ", type: "fruit"  },
  { id: 36 , name: "goji berry", type: "fruit"  },
  { id: 37 , name: "gonzoberry", type: "fruit"  },
  { id: 38 , name: "gooseberry", type: "fruit"  },
  { id: 39 , name: "grape ", type: "fruit"  },
  { id: 40 , name: "grapefruit", type: "fruit"  },
  { id: 41 , name: "guava ", type: "fruit"  },
  { id: 42 , name: "honeyberry", type: "fruit"  },
  { id: 43 , name: "honeydew", type: "fruit"  },
  { id: 44 , name: "huckleberry ", type: "fruit"  },
  { id: 45 , name: "jabuticaba", type: "fruit"  },
  { id: 46 , name: "jackfruit ", type: "fruit"  },
  { id: 47 , name: "jambul", type: "fruit"  },
  { id: 48 , name: "jujube", type: "fruit"  },
  { id: 49 , name: "juniper berry ", type: "fruit"  },
  { id: 50 , name: "kiwano", type: "fruit"  },
  { id: 51 , name: "kiwifruit ", type: "fruit"  },
  { id: 52 , name: "kumquat ", type: "fruit"  },
  { id: 53 , name: "lemon ", type: "fruit"  },
  { id: 54 , name: "lime", type: "fruit"  },
  { id: 55 , name: "longan", type: "fruit"  },
  { id: 56 , name: "loquat", type: "fruit"  },
  { id: 57 , name: "lychee", type: "fruit"  },
  { id: 58 , name: "mandarine ", type: "fruit"  },
  { id: 59 , name: "mango ", type: "fruit"  },
  { id: 60 , name: "mangosteen", type: "fruit"  },
  { id: 61 , name: "marionberry ", type: "fruit"  },
  { id: 62 , name: "melon ", type: "fruit"  },
  { id: 63 , name: "miracle fruit ", type: "fruit"  },
  { id: 64 , name: "mulberry", type: "fruit"  },
  { id: 65 , name: "nance ", type: "fruit"  },
  { id: 66 , name: "nectarine ", type: "fruit"  },
  { id: 67 , name: "olive ", type: "fruit"  },
  { id: 68 , name: "orange", type: "fruit"  },
  { id: 69 , name: "papaya", type: "fruit"  },
  { id: 70 , name: "passionfruit", type: "fruit"  },
  { id: 71 , name: "pea ", type: "fruit"  },
  { id: 72 , name: "peach ", type: "fruit"  },
  { id: 73 , name: "pear", type: "fruit"  },
  { id: 74 , name: "persimmon ", type: "fruit"  },
  { id: 75 , name: "pineapple ", type: "fruit"  },
  { id: 76 , name: "plantain", type: "fruit"  },
  { id: 77 , name: "plum", type: "fruit"  },
  { id: 78 , name: "plumcot ", type: "fruit"  },
  { id: 79 , name: "pluot ", type: "fruit"  },
  { id: 80 , name: "pomegranate ", type: "fruit"  },
  { id: 81 , name: "pomelo", type: "fruit"  },
  { id: 82 , name: "prune ", type: "fruit"  },
  { id: 83 , name: "pumpkin ", type: "fruit"  },
  { id: 84 , name: "purple mangosteen ", type: "fruit"  },
  { id: 85 , name: "quince", type: "fruit"  },
  { id: 86 , name: "raisin", type: "fruit"  },
  { id: 87 , name: "rambutan", type: "fruit"  },
  { id: 88 , name: "raspberry ", type: "fruit"  },
  { id: 89 , name: "redcurrant", type: "fruit"  },
  { id: 90 , name: "salak ", type: "fruit"  },
  { id: 91 , name: "salal berry ", type: "fruit"  },
  { id: 92 , name: "salmonberry ", type: "fruit"  },
  { id: 93 , name: "satsuma ", type: "fruit"  },
  { id: 94 , name: "soursop ", type: "fruit"  },
  { id: 95 , name: "squash", type: "fruit"  },
  { id: 96 , name: "star fruit", type: "fruit"  },
  { id: 97 , name: "strawberry", type: "fruit"  },
  { id: 98 , name: "tamarillo ", type: "fruit"  },
  { id: 99 , name: "tamarind", type: "fruit"  },
  { id: 100, name: "tangerine ", type: "fruit"  },
  { id: 101, name: "tomato", type: "fruit"  },
  { id: 102, name: "ugli fruit", type: "fruit"  },
  { id: 103, name: "watermelon", type: "fruit"  },
  { id: 104, name: "yuzu", type: "fruit"  },
  { id: 105, name: "acorn squash", type: "vegetable" },
  { id: 106, name: "adzuki", type: "vegetable" },
  { id: 107, name: "alfalfa sprouts ", type: "vegetable" },
  { id: 108, name: "amaranth", type: "vegetable" },
  { id: 109, name: "anise ", type: "vegetable" },
  { id: 110, name: "artichoke   ", type: "vegetable" },
  { id: 111, name: "arugula ", type: "vegetable" },
  { id: 112, name: "asparagus ", type: "vegetable" },
  { id: 113, name: "aubergine ", type: "vegetable" },
  { id: 114, name: "azuki beans ", type: "vegetable" },
  { id: 115, name: "banana squash ", type: "vegetable" },
  { id: 116, name: "basil ", type: "vegetable" },
  { id: 117, name: "bean sprouts", type: "vegetable" },
  { id: 118, name: "beet greens ", type: "vegetable" },
  { id: 119, name: "beetroot", type: "vegetable" },
  { id: 120, name: "bell pepper ", type: "vegetable" },
  { id: 121, name: "bitter melon", type: "vegetable" },
  { id: 122, name: "black beans ", type: "vegetable" },
  { id: 123, name: "black-eyed peas ", type: "vegetable" },
  { id: 124, name: "bok choy", type: "vegetable" },
  { id: 125, name: "borlotti bean ", type: "vegetable" },
  { id: 126, name: "broad beans ", type: "vegetable" },
  { id: 127, name: "broccoflower", type: "vegetable" },
  { id: 128, name: "broccoli", type: "vegetable" },
  { id: 129, name: "brussels sprouts", type: "vegetable" },
  { id: 130, name: "butter bean ", type: "vegetable" },
  { id: 131, name: "butternut squash", type: "vegetable" },
  { id: 132, name: "cabbage ", type: "vegetable" },
  { id: 133, name: "calabrese ", type: "vegetable" },
  { id: 134, name: "capsicum", type: "vegetable" },
  { id: 135, name: "caraway ", type: "vegetable" },
  { id: 136, name: "carrot", type: "vegetable" },
  { id: 137, name: "cauliflower ", type: "vegetable" },
  { id: 138, name: "cayenne pepper", type: "vegetable" },
  { id: 139, name: "ceci beans", type: "vegetable" },
  { id: 140, name: "celeriac", type: "vegetable" },
  { id: 141, name: "celery", type: "vegetable" },
  { id: 142, name: "chamomile ", type: "vegetable" },
  { id: 143, name: "chard ", type: "vegetable" },
  { id: 144, name: "chickpeas ", type: "vegetable" },
  { id: 145, name: "chili pepper", type: "vegetable" },
  { id: 146, name: "chives", type: "vegetable" },
  { id: 147, name: "cilantro", type: "vegetable" },
  { id: 148, name: "collard greens", type: "vegetable" },
  { id: 149, name: "coriander ", type: "vegetable" },
  { id: 150, name: "courgette ", type: "vegetable" },
  { id: 151, name: "cucumber", type: "vegetable" },
  { id: 152, name: "daikon", type: "vegetable" },
  { id: 153, name: "delicata", type: "vegetable" },
  { id: 154, name: "dill", type: "vegetable" },
  { id: 155, name: "eggplant", type: "vegetable" },
  { id: 156, name: "endive", type: "vegetable" },
  { id: 157, name: "fava bean ", type: "vegetable" },
  { id: 158, name: "fennel", type: "vegetable" },
  { id: 159, name: "fiddleheads ", type: "vegetable" },
  { id: 160, name: "frisee", type: "vegetable" },
  { id: 161, name: "garbanzos ", type: "vegetable" },
  { id: 162, name: "garlic", type: "vegetable" },
  { id: 163, name: "gem squash", type: "vegetable" },
  { id: 164, name: "ginger", type: "vegetable" },
  { id: 165, name: "green beans ", type: "vegetable" },
  { id: 166, name: "greens", type: "vegetable" },
  { id: 167, name: "habanero", type: "vegetable" },
  { id: 168, name: "herbs and spices", type: "vegetable" },
  { id: 169, name: "horseradish ", type: "vegetable" },
  { id: 170, name: "hubbard squash", type: "vegetable" },
  { id: 171, name: "jalapeno", type: "vegetable" },
  { id: 172, name: "jalapeÃ±o ", type: "vegetable" },
  { id: 173, name: "jerusalem artichoke ", type: "vegetable" },
  { id: 174, name: "jicama", type: "vegetable" },
  { id: 175, name: "kale", type: "vegetable" },
  { id: 176, name: "kidney beans", type: "vegetable" },
  { id: 177, name: "kohlrabi", type: "vegetable" },
  { id: 178, name: "lavender", type: "vegetable" },
  { id: 179, name: "leek", type: "vegetable" },
  { id: 180, name: "legumes ", type: "vegetable" },
  { id: 181, name: "lemon Grass ", type: "vegetable" },
  { id: 182, name: "lentils ", type: "vegetable" },
  { id: 183, name: "lettuce ", type: "vegetable" },
  { id: 184, name: "lima beans", type: "vegetable" },
  { id: 185, name: "mangel-wurzel ", type: "vegetable" },
  { id: 186, name: "mangetout ", type: "vegetable" },
  { id: 187, name: "marjoram", type: "vegetable" },
  { id: 188, name: "momordica charantia ", type: "vegetable" },
  { id: 189, name: "mung beans", type: "vegetable" },
  { id: 190, name: "mushrooms ", type: "vegetable" },
  { id: 191, name: "mustard greens", type: "vegetable" },
  { id: 192, name: "navy beans", type: "vegetable" },
  { id: 193, name: "nettles ", type: "vegetable" },
  { id: 194, name: "new zealand spinach ", type: "vegetable" },
  { id: 195, name: "okra", type: "vegetable" },
  { id: 196, name: "onion ", type: "vegetable" },
  { id: 197, name: "onions", type: "vegetable" },
  { id: 198, name: "oregano ", type: "vegetable" },
  { id: 199, name: "paprika ", type: "vegetable" },
  { id: 200, name: "parsley ", type: "vegetable" },
  { id: 201, name: "parsnip ", type: "vegetable" },
  { id: 202, name: "patty pans", type: "vegetable" },
  { id: 203, name: "peas", type: "vegetable" },
  { id: 204, name: "peppers ", type: "vegetable" },
  { id: 205, name: "pinto beans ", type: "vegetable" },
  { id: 206, name: "potato", type: "vegetable" },
  { id: 207, name: "pumpkin ", type: "vegetable" },
  { id: 208, name: "quandong", type: "vegetable" },
  { id: 209, name: "radicchio ", type: "vegetable" },
  { id: 210, name: "radish", type: "vegetable" },
  { id: 211, name: "rhizome ", type: "vegetable" },
  { id: 212, name: "rhubarb ", type: "vegetable" },
  { id: 213, name: "root vegetables ", type: "vegetable" },
  { id: 214, name: "rosemary", type: "vegetable" },
  { id: 215, name: "runner beans", type: "vegetable" },
  { id: 216, name: "rutabaga", type: "vegetable" },
  { id: 217, name: "sage", type: "vegetable" },
  { id: 218, name: "salsify ", type: "vegetable" },
  { id: 219, name: "scallion", type: "vegetable" },
  { id: 220, name: "shallot ", type: "vegetable" },
  { id: 221, name: "skirret ", type: "vegetable" },
  { id: 222, name: "snap peas ", type: "vegetable" },
  { id: 223, name: "soy beans ", type: "vegetable" },
  { id: 224, name: "spaghetti squash", type: "vegetable" },
  { id: 225, name: "spinach ", type: "vegetable" },
  { id: 226, name: "split peas", type: "vegetable" },
  { id: 227, name: "squash", type: "vegetable" },
  { id: 228, name: "sunchokes ", type: "vegetable" },
  { id: 229, name: "sweet potato", type: "vegetable" },
  { id: 230, name: "sweetcorn ", type: "vegetable" },
  { id: 231, name: "tabasco pepper", type: "vegetable" },
  { id: 232, name: "taro", type: "vegetable" },
  { id: 233, name: "tat soi ", type: "vegetable" },
  { id: 234, name: "thyme ", type: "vegetable" },
  { id: 235, name: "tomato", type: "vegetable" },
  { id: 236, name: "topinambur", type: "vegetable" },
  { id: 237, name: "tubers", type: "vegetable" },
  { id: 238, name: "turnip", type: "vegetable" },
  { id: 239, name: "wasabi", type: "vegetable" },
  { id: 240, name: "water chestnut", type: "vegetable" },
  { id: 241, name: "watercress", type: "vegetable" },
  { id: 242, name: "white radish", type: "vegetable" },
  { id: 243, name: "yam ", type: "vegetable" },
  { id: 244, name: "zucchini", type: "vegetable" },
  { id: 245, name: "acorn ", type: "nuts" },
  { id: 246, name: "almond", type: "nuts" },
  { id: 247, name: "beech ", type: "nuts" },
  { id: 248, name: "black walnut", type: "nuts" },
  { id: 249, name: "brazil nut", type: "nuts" },
  { id: 250, name: "candlenut ", type: "nuts" },
  { id: 251, name: "cashew", type: "nuts" },
  { id: 252, name: "chestnuts, including: ", type: "nuts" },
  { id: 253, name: "chilean hazel ", type: "nuts" },
  { id: 254, name: "chinese chestnut", type: "nuts" },
  { id: 255, name: "colocynth ", type: "nuts" },
  { id: 256, name: "egusi ", type: "nuts" },
  { id: 257, name: "filbert ", type: "nuts" },
  { id: 258, name: "hazelnuts ", type: "nuts" },
  { id: 259, name: "hickory ", type: "nuts" },
  { id: 260, name: "japanese chestnut ", type: "nuts" },
  { id: 261, name: "kola nut", type: "nuts" },
  { id: 262, name: "macadamia ", type: "nuts" },
  { id: 263, name: "malabar almond", type: "nuts" },
  { id: 264, name: "malabar chestnut", type: "nuts" },
  { id: 265, name: "malabar gourd ", type: "nuts" },
  { id: 266, name: "mamoncillo", type: "nuts" },
  { id: 267, name: "mongongo", type: "nuts" },
  { id: 268, name: "ogbono", type: "nuts" },
  { id: 269, name: "paradise nut", type: "nuts" },
  { id: 270, name: "pecan ", type: "nuts" },
  { id: 271, name: "pepita", type: "nuts" },
  { id: 272, name: "pili", type: "nuts" },
  { id: 273, name: "pistachio ", type: "nuts" },
  { id: 274, name: "shagbark hickory", type: "nuts" },
  { id: 275, name: "sweet chestnut", type: "nuts" },
  { id: 276, name: "ugu ", type: "nuts" },
  { id: 277, name: "walnuts ", type: "nuts" },
  { id: 278, name: "water chestnut", type: "nuts" },
  { id: 279, name: "amaranth grain", type: "seed" },
  { id: 280, name: "breadnut", type: "seed" },
  { id: 281, name: "buckwheat ", type: "seed" },
  { id: 282, name: "buckwheat groat ", type: "seed" },
  { id: 283, name: "chia", type: "seed" },
  { id: 284, name: "chia seed ", type: "seed" },
  { id: 285, name: "flax", type: "seed" },
  { id: 286, name: "flaxseed", type: "seed" },
  { id: 287, name: "hanza ", type: "seed" },
  { id: 288, name: "kaniwa", type: "seed" },
  { id: 289, name: "kaÃ±iwa ", type: "seed" },
  { id: 290, name: "linseed ", type: "seed" },
  { id: 291, name: "pitseed goosefoot ", type: "seed" },
  { id: 292, name: "quinoa", type: "seed" },
  { id: 293, name: "sesame", type: "seed" },
  { id: 294, name: "sesame seed ", type: "seed" },
  { id: 295, name: "aframomum melegueta ", type: "spice" },
  { id: 296, name: "ajwain", type: "spice" },
  { id: 297, name: "aleppo pepper ", type: "spice" },
  { id: 298, name: "allspice", type: "spice" },
  { id: 299, name: "alpinia galanga ", type: "spice" },
  { id: 300, name: "amchur", type: "spice" },
  { id: 301, name: "anardana", type: "spice" },
  { id: 302, name: "anise ", type: "spice" },
  { id: 303, name: "aromatic ginger ", type: "spice" },
  { id: 304, name: "asafoetida", type: "spice" },
  { id: 305, name: "black cardamom", type: "spice" },
  { id: 306, name: "black mustard ", type: "spice" },
  { id: 307, name: "black pepper", type: "spice" },
  { id: 308, name: "boesenbergia rotunda", type: "spice" },
  { id: 309, name: "brassica juncea ", type: "spice" },
  { id: 310, name: "brassica nigra", type: "spice" },
  { id: 311, name: "brazilian pepper", type: "spice" },
  { id: 312, name: "brown mustard ", type: "spice" },
  { id: 313, name: "bunium persicum ", type: "spice" },
  { id: 314, name: "camphor ", type: "spice" },
  { id: 315, name: "caraway ", type: "spice" },
  { id: 316, name: "cardamom", type: "spice" },
  { id: 317, name: "cardamom, black ", type: "spice" },
  { id: 318, name: "cassia", type: "spice" },
  { id: 319, name: "cayenne pepper", type: "spice" },
  { id: 320, name: "celery", type: "spice" },
  { id: 321, name: "celery seed ", type: "spice" },
  { id: 322, name: "chenpi", type: "spice" },
  { id: 323, name: "chili ", type: "spice" },
  { id: 324, name: "chili pepper", type: "spice" },
  { id: 325, name: "cinnamomum camphora ", type: "spice" },
  { id: 326, name: "cinnamon", type: "spice" },
  { id: 327, name: "clove ", type: "spice" },
  { id: 328, name: "coriander ", type: "spice" },
  { id: 329, name: "coriander seed", type: "spice" },
  { id: 330, name: "cubeb ", type: "spice" },
  { id: 331, name: "cumin ", type: "spice" },
  { id: 332, name: "cumin, black", type: "spice" },
  { id: 333, name: "dill", type: "spice" },
  { id: 334, name: "dill seed ", type: "spice" },
  { id: 335, name: "dill weed ", type: "spice" },
  { id: 336, name: "fennel", type: "spice" },
  { id: 337, name: "fenugreek ", type: "spice" },
  { id: 338, name: "fingerroot", type: "spice" },
  { id: 339, name: "galangal", type: "spice" },
  { id: 340, name: "galangal, greater ", type: "spice" },
  { id: 341, name: "galangal, lesser", type: "spice" },
  { id: 342, name: "garlic", type: "spice" },
  { id: 343, name: "ginger", type: "spice" },
  { id: 344, name: "golpar", type: "spice" },
  { id: 345, name: "grains of paradise", type: "spice" },
  { id: 346, name: "grains of selim ", type: "spice" },
  { id: 347, name: "greater galangal", type: "spice" },
  { id: 348, name: "horseradish ", type: "spice" },
  { id: 349, name: "juniper berry ", type: "spice" },
  { id: 350, name: "kaempferia galanga", type: "spice" },
  { id: 351, name: "kalonji ", type: "spice" },
  { id: 352, name: "lesser galangal ", type: "spice" },
  { id: 353, name: "liquorice ", type: "spice" },
  { id: 354, name: "long pepper ", type: "spice" },
  { id: 355, name: "mace", type: "spice" },
  { id: 356, name: "mahlab", type: "spice" },
  { id: 357, name: "malabathrum ", type: "spice" },
  { id: 358, name: "mango ", type: "spice" },
  { id: 359, name: "mango powder", type: "spice" },
  { id: 360, name: "mastic", type: "spice" },
  { id: 361, name: "mustard, black", type: "spice" },
  { id: 362, name: "mustard, brown", type: "spice" },
  { id: 363, name: "mustard, white", type: "spice" },
  { id: 364, name: "nigella ", type: "spice" },
  { id: 365, name: "nigella sativa", type: "spice" },
  { id: 366, name: "nutmeg", type: "spice" },
  { id: 367, name: "paprika ", type: "spice" },
  { id: 368, name: "pepper, brazilian ", type: "spice" },
  { id: 369, name: "pepper, long", type: "spice" },
  { id: 370, name: "pepper, peruvian", type: "spice" },
  { id: 371, name: "peppercorn", type: "spice" },
  { id: 372, name: "peruvian pepper ", type: "spice" },
  { id: 373, name: "pomegranate ", type: "spice" },
  { id: 374, name: "pomegranate seed", type: "spice" },
  { id: 375, name: "poppy ", type: "spice" },
  { id: 376, name: "poppy seed", type: "spice" },
  { id: 377, name: "saffron ", type: "spice" },
  { id: 378, name: "sarsaparilla", type: "spice" },
  { id: 379, name: "sassafras ", type: "spice" },
  { id: 380, name: "schinus molle ", type: "spice" },
  { id: 381, name: "schinus terebinthifolius", type: "spice" },
  { id: 382, name: "sesame", type: "spice" },
  { id: 383, name: "sichuan pepper", type: "spice" },
  { id: 384, name: "star anise", type: "spice" },
  { id: 385, name: "sumac ", type: "spice" },
  { id: 386, name: "tamarind", type: "spice" },
  { id: 387, name: "tasmanian pepper", type: "spice" },
  { id: 388, name: "tasmannia ", type: "spice" },
  { id: 389, name: "tejpat", type: "spice" },
  { id: 390, name: "tonka bean", type: "spice" },
  { id: 391, name: "turmeric", type: "spice" },
  { id: 392, name: "vanilla ", type: "spice" },
  { id: 393, name: "wasabi", type: "spice" },
  { id: 394, name: "white mustard ", type: "spice" },
  { id: 395, name: "zedoary ", type: "spice" },
  { id: 396, name: "zest", type: "spice" },
  { id: 397, name: "alligator ", type: "meat" },
  { id: 398, name: "beef", type: "meat" },
  { id: 399, name: "biltong ", type: "meat" },
  { id: 400, name: "cattle", type: "meat" },
  { id: 401, name: "chicken ", type: "meat" },
  { id: 402, name: "goat", type: "meat" },
  { id: 403, name: "mutton", type: "meat" },
  { id: 404, name: "offal ", type: "meat" },
  { id: 405, name: "ostrich ", type: "meat" },
  { id: 406, name: "pheasant", type: "meat" },
  { id: 407, name: "pork", type: "meat" },
  { id: 408, name: "rabbit", type: "meat" },
  { id: 409, name: "sheep ", type: "meat" },
  { id: 410, name: "veal", type: "meat" },
  { id: 411, name: "venison ", type: "meat" },
  { id: 412, name: "wild boar ", type: "meat" },
  { id: 413, name: "zwartbles sheep ", type: "meat" },
  { id: 414, name: "brisket ", type: "cuts" },
  { id: 415, name: "flank ", type: "cuts" },
  { id: 416, name: "fore shank", type: "cuts" },
  { id: 417, name: "hip ", type: "cuts" },
  { id: 418, name: "long loin ", type: "cuts" },
  { id: 419, name: "rib ", type: "cuts" },
  { id: 420, name: "sirloin tip ", type: "cuts" },
  { id: 421, name: "square chuck", type: "cuts" },
  { id: 422, name: "african rice ", type: "grains" },
  { id: 423, name: "asian rice ", type: "grains" },
  { id: 424, name: "barley ", type: "grains" },
  { id: 425, name: "barley groat ", type: "grains" },
  { id: 426, name: "corn ", type: "grains" },
  { id: 427, name: "corn kernel", type: "grains" },
  { id: 428, name: "durum", type: "grains" },
  { id: 429, name: "durum wheat", type: "grains" },
  { id: 430, name: "kamut", type: "grains" },
  { id: 431, name: "maize", type: "grains" },
  { id: 432, name: "oat", type: "grains" },
  { id: 433, name: "oat groat", type: "grains" },
  { id: 434, name: "rye", type: "grains" },
  { id: 435, name: "rye berry", type: "grains" },
  { id: 436, name: "sorghum", type: "grains" },
  { id: 437, name: "spelt", type: "grains" },
  { id: 438, name: "spelt wheat", type: "grains" },
  { id: 439, name: "wheat", type: "grains" },
  { id: 440, name: "wheat berry", type: "grains" },
  { id: 441, name: "wild rice", type: "grains" }
  ];

// query = https://www.google.ca/search?ei=DfY7W527IKrf0gKVqa_YAg&q={food name}+image
// find ID = dimg_1

// path: client/src/img/foods/

function getImages() {
  images.forEach( (food) => {
    let url = `https://www.google.ca/search?ei=DfY7W527IKrf0gKVqa_YAg&q=${food.name}+image`;
    let i = 1;
    curl(url).then(( result ) => {
      console.log("==========================================================================", result.body, typeof result.body);
        let start = result.body.charAt('<g-img>');
        let end = result.body.charAt('</g-img>');
        // let tag = result.body.substr(start, end);
        console.log("START", start, "END", end), "==================";
      i++;
      // console.log(JSON.parse(result.body), typeof result.body);
      // result = JSON.parse(result.body);
    }).then( (recipeList) => {
      console.log(recipeList);
      res.status(200);
      res.json(recipeList);
    });

  });
}

getImages();