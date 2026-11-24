# `@ancientstudio/ascii-engine-module`

Motor gráfico **3D ASCII em tempo real** (WebGL2 + Three.js + Post-Processing GLSL Shaders customizados), projetado com arquitetura **100% desacoplada e agnóstica a frameworks** (zero dependência de React, Vue ou globais externas) para acoplamento limpo em portfólios modernos ou aplicações web interativas.

Inspirado na direção de arte de *ASCII Realms* e *Asciify Engine*, o motor renderiza um santuário tridimensional noturno completo com:
- **Atlas tipográfico dinâmico em Canvas 2D**: rampa de luminância calibrada (` .,:;-=+*#%@`) combinada com glifos estruturais direcionais (`/ \ | _ [ ]`) selecionados via detecção de bordas Sobel (profundidade + luminância).
- **Iluminação dinâmica colorida & Sombras projetadas**: fundo noturno profundo (`#050508`), tochas/braseiros âmbar oscilantes (`#FF8C24`), luar ciano frio (`#2E6F95`), vegetação esmeralda (`#3A7D5C`) e lanterna interativa acoplada ao cursor.
- **Multi-pass ASCII Bloom**: fontes de luz quente sofrem extração *bright-pass* e *Kawase/Gaussian blur* separável antes da quantização tipográfica, permitindo que o brilho difuso "vaze" organicamente sobre os glifos adjacentes.
- **Profundidade de Campo (DoF)**: linearização do `DepthTexture` da câmera para suavizar silhuetas em primeiro plano e montanhas distantes mantendo o ponto focal nítido.
- **Prevenção estrita contra *Memory Leaks***: `ResizeObserver` restrito ao container, hibernação via `pause()`/`resume()` sem saltos de `deltaTime`, e `.dispose()` completo de geometrias, materiais, *shadow maps*, *render targets* e listeners em `destroy()`.

---

## Estrutura de Diretórios

```text
/ascii-engine-module
├── /src
│   ├── /core/
│   │   ├── AsciiEngineCore.ts        # Orquestrador modular (modes: 'playground' | 'mascot')
│   │   ├── EngineLoop.ts             # Agendador rAF determinístico com deltaTime clamp e telemetria FPS
│   │   ├── LifecycleManager.ts       # ResizeObserver, IntersectionObserver, Visibility e .dispose() GPU
│   │   └── defaultConfig.ts          # Paleta padrão, rampa de alto contraste e merge imutável
│   ├── /ecs/
│   │   ├── World.ts                  # Registro enxuto de entidades e componentes puros de dados
│   │   └── SystemRunner.ts           # Pipeline ECS (Input, MovementRotation, Animation, RenderSync)
│   ├── /world/
│   │   ├── MapLoader.ts              # Definição declarativa leve do mapa ('sanctuary-isle')
│   │   └── PlaygroundSceneBuilder.ts # Terreno 3D, lago com reflexos, ponte de pedras, ruínas e vegetação
│   ├── /entities/
│   │   ├── TuxEntityFactory.ts       # Pinguim Linux Tux 3D articulado de alto contraste ([ STACK // NEOFETCH ])
│   │   └── PlaygroundEntityFactory.ts# Cristal rúnico, braseiros oscilantes e explorador Wayfarer
│   ├── /animation/
│   │   └── AnimationSystem.ts        # Respiração orgânica, flutuação e articulação de asas/membros
│   ├── /vfx/
│   │   └── VfxController.ts          # Parallax suave da câmera, lanterna do cursor e partículas
│   ├── /input/
│   │   ├── PointerInput.ts           # Rastreamento passivo ({ passive: true }) de mouse e toque
│   │   └── KeyboardInput.ts          # Teclado opt-in isolado por foco para exploração futura sem roubar scroll
│   ├── /scene/
│   │   └── noise.ts                  # Value Noise / fBm / Ridged fBm determinístico
│   ├── /shaders/
│   │   ├── AsciiPostProcessor.ts     # Pipeline multi-pass (Scene + Depth -> Bloom -> ASCII Composite)
│   │   ├── asciiShader.ts            # Vertex & Fragment Shaders GLSL customizados
│   │   ├── waterShader.ts            # Shader GLSL de água reflexiva com ondulações e trilhas de luz
│   │   └── glyphAtlas.ts             # Gerador de atlas tipográfico monoespaçado em Canvas 2D
│   ├── /types/
│   │   └── index.ts                  # Interfaces estritas (EngineConfig, SceneMode, ThemePalette)
│   └── index.ts                      # Facade pública exportando `AsciiSceneEngine` e módulos
├── integration-entry.ts              # Entrypoint IIFE para o bundle `assets/js/ascii-engine.bundle.js`
├── /demo                             # Sandbox HTML/CSS/TS isolado com HUD sobreposta e controles
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Como Executar o Sandbox de Validação (`/demo`)

```bash
cd ascii-engine-module
npm install
npm run dev
```

Para validar tipagem estrita e compilar o pacote de biblioteca (`ESM` + `CJS`):

```bash
npm run typecheck
npm run build
```

---

## Como Importar e Acoplar no Portfólio Principal

### 1. HTML / Container Host (com HUD sobreposta)
O canvas WebGL é injetado automaticamente com `position: absolute; inset: 0; z-index: 0; pointer-events: none`. Qualquer conteúdo HTML dentro do container com `z-index >= 1` permanece clicável e selecionável sem conflito, enquanto o movimento do mouse relativo ao container alimenta o parallax e a lanterna 3D.

```html
<section id="hero-ascii-container" style="position: relative; width: 100%; height: 85vh; overflow: hidden;">
  <div style="position: relative; z-index: 2;">
    <h1>Eron Yamamoto</h1>
    <a href="mailto:contato@exemplo.com">Entrar em contato</a>
  </div>
</section>
```

### 2. Instanciação em TypeScript / JavaScript Vanilla

```ts
import { AsciiSceneEngine } from './ascii-engine-module/src';

const heroEl = document.getElementById('hero-ascii-container')!;

const engine = new AsciiSceneEngine(heroEl, {
  cellSize: 10,
  autoResponsiveDensity: true,
  bloomIntensity: 1.2,
  parallaxIntensity: 1.45,
  palette: {
    background: '#050508',
    warmLight: '#FF8C24',
    coolAmbient: '#2E6F95',
    foliageAccent: '#3A7D5C',
  },
});

// 1. Inicializa o WebGL, ResizeObserver e inicia o loop
engine.mount();

// 2. Economia automática de GPU quando a Hero Section sai da viewport (IntersectionObserver)
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry?.isIntersecting) {
      engine.resume();
    } else {
      engine.pause();
    }
  },
  { threshold: 0.05 }
);
observer.observe(heroEl);

// 3. Alteração dinâmica em tempo real (ex.: troca de tema ou modo econômico)
engine.updateConfig({
  bloomIntensity: 1.5,
  cellSize: 12,
});

// 4. Desmontagem limpa em rotas SPA (zero vazamento de VRAM ou listeners)
window.addEventListener('pagehide', () => {
  observer.disconnect();
  engine.destroy();
});
```

### 3. Exemplo de Hook Desacoplado (Caso o futuro portfólio utilize React/Next.js)

```tsx
import { useEffect, useRef } from 'react';
import { AsciiSceneEngine, type PartialEngineConfig } from '@ancientstudio/ascii-engine-module';

export function AsciiHeroCanvas({ config }: { config?: PartialEngineConfig }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<AsciiSceneEngine | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const instance = new AsciiSceneEngine(containerRef.current, config);
    instance.mount();
    engineRef.current = instance;

    return () => {
      instance.destroy();
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (config) {
      engineRef.current?.updateConfig(config);
    }
  }, [config]);

  return <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }} />;
}
```

---

## Contrato Completo da API Pública (`AsciiSceneEngine`)

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| `mount` | `mount(): void` | Cria o contexto WebGL no container, observa redimensionamentos via `ResizeObserver`, compila os shaders GLSL e inicia o loop. |
| `pause` | `pause(): void` | Cancela o `requestAnimationFrame` imediatamente para poupar GPU (ex.: scroll fora da Hero ou aba oculta). |
| `resume` | `resume(): void` | Retoma o loop redefinindo o acumulador temporal para evitar saltos bruscos de `deltaTime`. |
| `updateConfig` | `updateConfig(partial: PartialEngineConfig): void` | Atualiza paleta de cores, densidade (`cellSize`), `bloomIntensity`, `dofStrength` ou rampa de caracteres em tempo real. |
| `destroy` | `destroy(): void` | Remove o `<canvas>` do DOM, desconecta `ResizeObserver` e listeners, e executa `.dispose()` em todas as geometrias, materiais, texturas e *render targets*. |
| `getState` | `getState(): 'idle' \| 'running' \| 'paused' \| 'destroyed'` | Retorna o estado atual do ciclo de vida. |
| `getStats` | `getStats(): EngineStats` | Retorna FPS suavizado, `frameTimeMs`, tamanho ativo da célula e dimensões da grade ASCII (`columns` × `rows`). |
