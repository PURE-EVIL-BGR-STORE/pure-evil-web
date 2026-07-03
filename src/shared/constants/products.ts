export interface Product {
  id: string
  name: string
  price: number
  originalPrice: number
  spec: string
  desc: string
  img: string
  category: string
  code: string
  cropClass?: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'void-hoodie',
    name: 'VOID HOODIE',
    price: 180,
    originalPrice: 240,
    spec: '600 GSM · loopback fleece',
    desc: 'Heavyweight Japanese loopback fleece, garment-dyed in true obsidian. Raw-cut hem, oversized monastic hood, and the sigil screen-printed in matte oxblood across the spine. Cut for ritual, built for the obsessed.',
    img: '/void_hoodie_studio.png',
    category: 'APPAREL',
    code: 'PE-VH-001'
  },
  {
    id: 'ascension-parka',
    name: 'ASCENSION PARKA',
    price: 320,
    originalPrice: 400,
    spec: '3-layer membrane · waterproof',
    desc: 'Technical gothic parka with modular high-neck cowl, fully taped seams, magnetic pocket flaps, and oxidised custom hardware.',
    img: '/look_ascension.png',
    category: 'OUTERWEAR',
    code: 'PE-AP-002'
  },
  {
    id: 'ritual-cloak',
    name: 'RITUAL CLOAK',
    price: 290,
    originalPrice: 360,
    spec: '100% merino · knit drape',
    desc: 'Knitted long cloak in superfine merino wool. Dramatic asymmetric hem, raw-edge cowl hood, integrated thumbholes, and dual concealed internal drop pockets.',
    img: '/look_ritual.png',
    category: 'OUTERWEAR',
    code: 'PE-RC-003'
  },
  {
    id: 'eclipse-bomber',
    name: 'ECLIPSE BOMBER',
    price: 260,
    originalPrice: 320,
    spec: 'satin shell · blood-red lining',
    desc: 'Classic flight silhouette reworked in industrial obsidian satin. Features high-density matte crest chest embroidery, heavy rib trim, and blood-red quilted lining.',
    img: '/look_eclipse.png',
    category: 'OUTERWEAR',
    code: 'PE-EB-004'
  },
  {
    id: 'obsidian-cargo',
    name: 'OBSIDIAN CARGO',
    price: 210,
    originalPrice: 270,
    spec: 'heavy canvas · 10-pocket design',
    desc: 'Reinforced triple-weave cotton canvas cargo trousers. Features 10-pocket modular system, articulated knees, adjustable ankle straps, and distressed steel D-ring details.',
    img: '/look_hardware.png',
    category: 'TROUSERS',
    code: 'PE-OC-005'
  },
  {
    id: 'slashed-longsleeve',
    name: 'SLASHED LONGSLEEVE',
    price: 129,
    originalPrice: 169,
    spec: 'distressed cotton',
    desc: 'Technical long sleeve shirt with slashed detailing.',
    img: '/images/hero_model.png',
    category: 'APPAREL',
    code: 'PE-SL-006'
  },
  {
    id: 'shadow-cargo',
    name: 'SHADOW CARGO PANTS',
    price: 159,
    originalPrice: 199,
    spec: 'heavy canvas',
    desc: 'Obsidian cargo pants with custom D-rings.',
    img: '/images/hero_model.png',
    category: 'TROUSERS',
    code: 'PE-SC-007'
  }
]
