export interface Product {
  id: string
  name: string
  price: number
  spec: string
  desc: string
  img: string
  code: string
  cropClass?: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'void-hoodie',
    name: 'Void Hoodie',
    price: 180,
    spec: '600 GSM · loopback fleece',
    desc: 'Heavyweight Japanese loopback fleece, garment-dyed in true obsidian. Oversized monastic hood, raw-cut hem, and the sigil screen-printed in matte oxblood across the spine.',
    img: '/void_hoodie_studio.png',
    code: 'PE-VH-001'
  },
  {
    id: 'ascension-parka',
    name: 'Ascension Parka',
    price: 320,
    spec: '3-layer membrane · waterproof',
    desc: 'Technical gothic parka with modular high-neck cowl, fully taped seams, magnetic pocket flaps, and oxidised custom hardware. Built to outlast external forces.',
    img: '/look_ascension.png',
    code: 'PE-AP-002'
  },
  {
    id: 'ritual-cloak',
    name: 'Ritual Cloak',
    price: 290,
    spec: '100% merino · knit drape',
    desc: 'Knitted long cloak in superfine merino wool. Dramatic asymmetric hem, raw-edge cowl hood, integrated thumbholes, and dual concealed internal drop pockets.',
    img: '/look_ritual.png',
    code: 'PE-RC-003'
  },
  {
    id: 'eclipse-bomber',
    name: 'Eclipse Bomber',
    price: 260,
    spec: 'satin shell · blood-red lining',
    desc: 'Classic flight silhouette reworked in industrial obsidian satin. Features high-density matte crest chest embroidery, heavy rib trim, and blood-red quilted lining.',
    img: '/look_eclipse.png',
    code: 'PE-EB-004'
  },
  {
    id: 'obsidian-cargo',
    name: 'Obsidian Cargo',
    price: 210,
    spec: 'heavy canvas · 10-pocket design',
    desc: 'Reinforced triple-weave cotton canvas cargo trousers. Features 10-pocket modular system, articulated knees, adjustable ankle straps, and distressed steel D-ring details.',
    img: '/look_hardware.png',
    code: 'PE-OC-005'
  }
]

export const SIZES = ['XS', 'S', 'M', 'L', 'XL']

export const getOriginalPrice = (id: string): number => {
  switch (id) {
    case 'void-hoodie': return 240
    case 'ascension-parka': return 400
    case 'ritual-cloak': return 360
    case 'eclipse-bomber': return 320
    case 'obsidian-cargo': return 270
    default: return 250
  }
}

export const getCategoryLabel = (id: string): string => {
  switch (id) {
    case 'void-hoodie': return 'APPAREL — HEAVYWEIGHT'
    case 'ascension-parka': return 'OUTERWEAR — TECHNICAL'
    case 'ritual-cloak': return 'OUTERWEAR — MERINO KNIT'
    case 'eclipse-bomber': return 'OUTERWEAR — SATIN SHELL'
    case 'obsidian-cargo': return 'TROUSERS — HEAVY CANVAS'
    default: return 'APPAREL — RITUAL'
  }
}
