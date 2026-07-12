'use client'

import React, { useEffect, useRef } from 'react'
import type { Product } from '@/shared/constants/products'
import '../styles/products.css'

export interface ProductFluidCardProps {
  product: Product
}

export function ProductFluidCard({ product }: ProductFluidCardProps): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const sidebar = container.querySelector('#sidebarMenu')
    if (!sidebar) return

    const menuItems = sidebar.querySelectorAll('.menu-item')
    const tabs = container.querySelectorAll('.tab')

    const CORNER_PROP = {
      tl: 'borderTopLeftRadius',
      tr: 'borderTopRightRadius',
      bl: 'borderBottomLeftRadius',
      br: 'borderBottomRightRadius'
    } as const

    // MA TRẬN PHÂN PHỐI TÂM MẶC NẠ ĐỐI XỨNG (giữ nguyên logic đúng của bản 2)
    const MASK_CENTERS = {
      'fillet-x': {
        tl: '0% 100%',   // bottom-left
        tr: '100% 100%', // bottom-right
        bl: '0% 0%',     // top-left
        br: '100% 0%'    // top-right
      },
      'fillet-y': {
        tl: '100% 0%',   // top-right
        tr: '0% 0%',     // top-left
        bl: '100% 100%', // bottom-right
        br: '0% 100%'    // bottom-left
      }
    } as const

    // BẢNG TOẠ ĐỘ left/top CỤ THỂ CHO TỪNG GÓC x TỪNG MODE.
    // Quy đổi từ top/bottom/left/right sang chỉ còn left/top (dùng calc()),
    // để KHÔNG bao giờ có giá trị 'auto' -> transition mới nội suy (trượt) được.
    const R = 'var(--border-inverted-radius)'
    const FILLET_POS = {
      tl: {
        'fillet-x': { left: `calc(-1 * ${R})`, top: '0' },
        'fillet-y': { left: '0', top: `calc(-1 * ${R})` },
        hidden: { left: '0', top: '0' }
      },
      tr: {
        'fillet-x': { left: '100%', top: '0' },
        'fillet-y': { left: `calc(100% - ${R})`, top: `calc(-1 * ${R})` },
        // FIX: hidden trước đây trùng y hệt fillet-x (left:100%, top:0)
        // -> left/top không đổi khi bật lên, chỉ opacity đổi -> trông như ẩn/hiện.
        hidden: { left: `calc(100% - ${R})`, top: '0' }
      },
      bl: {
        'fillet-x': { left: `calc(-1 * ${R})`, top: `calc(100% - ${R})` },
        'fillet-y': { left: '0', top: '100%' },
        hidden: { left: '0', top: `calc(100% - ${R})` }
      },
      br: {
        'fillet-x': { left: '100%', top: `calc(100% - ${R})` },
        'fillet-y': { left: `calc(100% - ${R})`, top: '100%' },
        // FIX: hidden trước đây trùng y hệt fillet-x -> cùng lỗi như tr ở trên.
        hidden: { left: `calc(100% - ${R})`, top: `calc(100% - ${R})` }
      }
    } as const

    function ensureCornerNodes(dock: HTMLElement): void {
      const typedDock = dock as HTMLElement & { dataset: { cornersReady?: string } }
      if (typedDock.dataset.cornersReady) return
      ;['tl', 'tr', 'bl', 'br'].forEach(corner => {
        const el = document.createElement('i')
        el.className = 'fillet fillet-' + corner
        typedDock.appendChild(el)
      })
      typedDock.dataset.cornersReady = '1'
    }

    function setCorner(
      dock: HTMLElement,
      corner: 'tl' | 'tr' | 'bl' | 'br',
      mode: 'round' | 'flat' | 'fillet-x' | 'fillet-y'
    ): void {
      const prop = CORNER_PROP[corner]
      const filletEl = dock.querySelector('.fillet-' + corner) as HTMLElement | null
      const posSet = FILLET_POS[corner]

      if (mode === 'round') {
        dock.style[prop] = ''
        if (filletEl) {
          filletEl.style.left = posSet.hidden.left
          filletEl.style.top = posSet.hidden.top
          filletEl.style.opacity = '0'
          filletEl.style.transform = 'scale(0.4)'
        }
      } else if (mode === 'flat') {
        dock.style[prop] = '0px'
        if (filletEl) {
          filletEl.style.left = posSet.hidden.left
          filletEl.style.top = posSet.hidden.top
          filletEl.style.opacity = '0'
          filletEl.style.transform = 'scale(0.4)'
        }
      } else if (mode === 'fillet-x' || mode === 'fillet-y') {
        dock.style[prop] = '0px'
        if (filletEl) {
          const p = posSet[mode]
          filletEl.style.left = p.left
          filletEl.style.top = p.top
          filletEl.style.opacity = '1'
          filletEl.style.transform = 'scale(1)'

          // Ép cấu trúc Mask tâm đục lỗ chuẩn xác theo hệ toạ độ
          const center = MASK_CENTERS[mode][corner]
          const maskStr = `radial-gradient(circle at ${center}, transparent var(--border-inverted-radius), #000 calc(var(--border-inverted-radius) + 0.5px))`
          filletEl.style.maskImage = maskStr
          ;(filletEl.style as unknown as { webkitMaskImage: string }).webkitMaskImage = maskStr
        }
      }
    }

    function runUniversalFluidEngine(): void {
      const containerEl = containerRef.current
      if (!containerEl) return

      const allDocks = Array.from(containerEl.querySelectorAll('.fluid-dock')) as HTMLElement[]
      allDocks.forEach(ensureCornerNodes)

      // FIX: reset TẤT CẢ phần tử từng có fillet, kể cả tab/menu-item vừa MẤT
      // class .fluid-dock (không chỉ những cái đang active) - nếu không, phần
      // tử vừa bị bỏ active sẽ bị "đứng hình" vĩnh viễn ở trạng thái cũ vì nó
      // không còn được chọn bởi querySelectorAll('.fluid-dock') nữa.
      const everCorneredEls = Array.from(containerEl.querySelectorAll('[data-corners-ready]')) as HTMLElement[]
      everCorneredEls.forEach(d => ['tl', 'tr', 'bl', 'br'].forEach(c => setCorner(d, c as 'tl' | 'tr' | 'bl' | 'br', 'round')))

      const docks = allDocks.filter(d => !d.parentElement?.closest('.fluid-dock'))

      const state = new Map<HTMLElement, { tl: string; tr: string; bl: string; br: string }>()
      docks.forEach(d => state.set(d, { tl: 'round', tr: 'round', bl: 'round', br: 'round' }))

      const tolerance = 6
      const rects = docks.map(d => d.getBoundingClientRect())

      for (let i = 0; i < docks.length; i++) {
        for (let j = 0; j < docks.length; j++) {
          if (i === j) continue

          const rA = rects[i], rB = rects[j]
          const sA = state.get(docks[i]), sB = state.get(docks[j])

          if (!sA || !sB) continue

          // --- TRỤC DỌC: đáy A chạm đỉnh B ---
          const isVerticalTouch = Math.abs(rA.bottom - rB.top) < tolerance
          const hasHorizontalOverlap = !(rA.right < rB.left + tolerance || rA.left > rB.right - tolerance)

          if (isVerticalTouch && hasHorizontalOverlap) {
            if (rB.left <= rA.left + tolerance) sA.bl = 'flat'
            if (rB.right >= rA.right - tolerance) sA.br = 'flat'
            if (rA.left <= rB.left + tolerance) sB.tl = 'flat'
            if (rA.right >= rB.right - tolerance) sB.tr = 'flat'

            if (rB.left < rA.left - tolerance) sA.bl = 'fillet-x'
            if (rB.right > rA.right + tolerance) sA.br = 'fillet-x'
            if (rA.left < rB.left - tolerance) sB.tl = 'fillet-x'
            if (rA.right > rB.right + tolerance) sB.tr = 'fillet-x'
          }

          // --- TRỤC NGANG: phải A chạm trái B ---
          const isHorizontalTouch = Math.abs(rA.right - rB.left) < tolerance
          const hasVerticalOverlap = !(rA.bottom < rB.top + tolerance || rA.top > rB.bottom - tolerance)

          if (isHorizontalTouch && hasVerticalOverlap) {
            if (rB.top <= rA.top + tolerance) sA.tr = 'flat'
            if (rB.bottom >= rA.bottom - tolerance) sA.br = 'flat'
            if (rA.top <= rB.top + tolerance) sB.tl = 'flat'
            if (rA.bottom >= rB.bottom - tolerance) sB.bl = 'flat'

            if (rB.top < rA.top - tolerance) sA.tr = 'fillet-y'
            if (rB.bottom > rA.bottom + tolerance) sA.br = 'fillet-y'
            if (rA.top < rB.top - tolerance) sB.tl = 'fillet-y'
            if (rA.bottom > rB.bottom + tolerance) sB.bl = 'fillet-y'
          }
        }
      }

      docks.forEach(d => {
        const s = state.get(d)
        if (!s) return
        setCorner(d, 'tl', s.tl as 'round' | 'flat' | 'fillet-x' | 'fillet-y')
        setCorner(d, 'tr', s.tr as 'round' | 'flat' | 'fillet-x' | 'fillet-y')
        setCorner(d, 'bl', s.bl as 'round' | 'flat' | 'fillet-x' | 'fillet-y')
        setCorner(d, 'br', s.br as 'round' | 'flat' | 'fillet-x' | 'fillet-y')
      })
    }

    const onTabClick = (e: Event): void => {
      tabs.forEach(t => t.classList.remove('active', 'fluid-dock'))
      const clicked = e.currentTarget as HTMLElement
      clicked.classList.add('active', 'fluid-dock')
      runUniversalFluidEngine()
    }

    const onMenuItemClick = (e: Event): void => {
      menuItems.forEach(i => i.classList.remove('fluid-dock'))
      const clicked = e.currentTarget as HTMLElement
      clicked.classList.add('fluid-dock')
      runUniversalFluidEngine()
    }

    tabs.forEach(tab => tab.addEventListener('click', onTabClick))
    menuItems.forEach(item => item.addEventListener('click', onMenuItemClick))

    // Initialize corner nodes and run the fluid layout math
    container.querySelectorAll('.tab, .menu-item').forEach(el => ensureCornerNodes(el as HTMLElement))
    runUniversalFluidEngine()

    // Listen to resize
    window.addEventListener('resize', runUniversalFluidEngine)

    return () => {
      tabs.forEach(tab => tab.removeEventListener('click', onTabClick))
      menuItems.forEach(item => item.removeEventListener('click', onMenuItemClick))
      window.removeEventListener('resize', runUniversalFluidEngine)
    }
  }, [product]) // Re-run when product changes

  return (
    <div className="card-outer-wrapper flex justify-center items-center w-full" ref={containerRef}>
      <div className="card" id="mainCard">
        <div className="fluid-block">
          <div className="card-content-wrapper">
            <div className="card-header">
              <h1 className="main-title">{product.name}</h1>
              <div className="location-box fluid-dock">
                <svg width="12" height="14" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <div className="location-text">
                  Cy cinema,<br />23 Azumaki St.
                </div>
              </div>
            </div>

            <div className="tabs-container fluid-dock">
              <button className="tab active">{product.code}</button>
              <button className="tab">BE20</button>
              <button className="tab">XX023</button>
            </div>

            <div className="main-content">
              <div className="display-panel fluid-dock">
                <div className="product-container-3d">
                  <img
                    className="product-mockup-img"
                    src={product.img}
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              </div>

              <div className="left-menu-sidebar" id="sidebarMenu">
                <div className="menu-item item-colors fluid-dock">
                  <div className="color-dot red" />
                  <div className="color-dot black" />
                  <div className="color-dot white" />
                </div>
                <div className="menu-item item-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <div className="menu-item item-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
                  </svg>
                </div>
              </div>

              <div className="card-footer fluid-dock">
                <div className="stock-info">
                  <span className="stock-label">Available</span>
                  <div className="stock-count-wrapper">
                    <span className="stock-number">158</span>
                    <span className="stock-unit">stocks</span>
                  </div>
                </div>
                <div className="fab-button cursor-default select-none" style={{ cursor: 'default' }}>
                  ${product.price}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
