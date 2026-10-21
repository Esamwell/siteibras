import { useRef, useEffect, useCallback } from 'react'
import './RichTextEditor.css'

interface RichTextEditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
  minHeight?: number
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Digite o conteúdo aqui...',
  minHeight = 220,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const isInternalUpdate = useRef(false)

  // Sync external value → editor (only on first mount or external reset)
  useEffect(() => {
    if (!editorRef.current) return
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false
      return
    }
    if (editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value
    }
  }, [value])

  const exec = useCallback((command: string, val?: string) => {
    editorRef.current?.focus()
    document.execCommand(command, false, val)
    isInternalUpdate.current = true
    onChange(editorRef.current?.innerHTML ?? '')
  }, [onChange])

  const handleInput = () => {
    isInternalUpdate.current = true
    onChange(editorRef.current?.innerHTML ?? '')
  }

  const applyBlock = (tag: 'h2' | 'h3' | 'p' | 'blockquote') => {
    editorRef.current?.focus()
    document.execCommand('formatBlock', false, tag)
    isInternalUpdate.current = true
    onChange(editorRef.current?.innerHTML ?? '')
  }

  const insertHR = () => {
    editorRef.current?.focus()
    document.execCommand('insertHTML', false, '<hr/><br/>')
    isInternalUpdate.current = true
    onChange(editorRef.current?.innerHTML ?? '')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      exec('insertHTML', '&nbsp;&nbsp;&nbsp;&nbsp;')
    }
  }

  return (
    <div className="rte-wrapper">
      {/* Toolbar */}
      <div className="rte-toolbar" role="toolbar" aria-label="Barra de formatacao">

        <div className="rte-toolbar__group">
          <button type="button" className="rte-btn rte-btn--bold" title="Negrito (Ctrl+B)"
            onMouseDown={(e) => { e.preventDefault(); exec('bold') }}>
            <strong>B</strong>
          </button>
          <button type="button" className="rte-btn rte-btn--italic" title="Italico (Ctrl+I)"
            onMouseDown={(e) => { e.preventDefault(); exec('italic') }}>
            <em>I</em>
          </button>
          <button type="button" className="rte-btn" title="Sublinhado (Ctrl+U)"
            onMouseDown={(e) => { e.preventDefault(); exec('underline') }}>
            <span style={{ textDecoration: 'underline' }}>S</span>
          </button>
        </div>

        <div className="rte-divider" />

        <div className="rte-toolbar__group">
          <button type="button" className="rte-btn rte-btn--heading" title="Titulo grande (H2)"
            onMouseDown={(e) => { e.preventDefault(); applyBlock('h2') }}>
            H2
          </button>
          <button type="button" className="rte-btn rte-btn--heading rte-btn--sm" title="Subtitulo (H3)"
            onMouseDown={(e) => { e.preventDefault(); applyBlock('h3') }}>
            H3
          </button>
          <button type="button" className="rte-btn rte-btn--para" title="Paragrafo normal"
            onMouseDown={(e) => { e.preventDefault(); applyBlock('p') }}>
            P
          </button>
        </div>

        <div className="rte-divider" />

        <div className="rte-toolbar__group">
          <button type="button" className="rte-btn" title="Lista com marcadores"
            onMouseDown={(e) => { e.preventDefault(); exec('insertUnorderedList') }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/>
              <circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none"/>
              <circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none"/>
              <circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none"/>
            </svg>
          </button>
          <button type="button" className="rte-btn" title="Lista numerada"
            onMouseDown={(e) => { e.preventDefault(); exec('insertOrderedList') }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/>
              <text x="2" y="8" fontSize="7" fontWeight="bold" fill="currentColor" stroke="none">1</text>
              <text x="2" y="14" fontSize="7" fontWeight="bold" fill="currentColor" stroke="none">2</text>
              <text x="2" y="20" fontSize="7" fontWeight="bold" fill="currentColor" stroke="none">3</text>
            </svg>
          </button>
        </div>

        <div className="rte-divider" />

        <div className="rte-toolbar__group">
          <button type="button" className="rte-btn" title="Citacao / Destaque"
            onMouseDown={(e) => { e.preventDefault(); applyBlock('blockquote') }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
            </svg>
          </button>
          <button type="button" className="rte-btn" title="Linha separadora"
            onMouseDown={(e) => { e.preventDefault(); insertHR() }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="3" y1="12" x2="21" y2="12"/>
            </svg>
          </button>
          <button type="button" className="rte-btn rte-btn--clear" title="Limpar formatacao"
            onMouseDown={(e) => { e.preventDefault(); exec('removeFormat') }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 7V4h16v3"/><path d="M5 20h6"/><path d="M13 4l-9 16"/>
              <line x1="17" y1="9" x2="21" y2="20"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        className="rte-body"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        data-placeholder={placeholder}
        style={{ minHeight }}
        role="textbox"
        aria-multiline="true"
        aria-label="Conteudo da materia"
      />
    </div>
  )
}
