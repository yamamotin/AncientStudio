# `@ancientstudio/ascii-engine-module`

Motor gráfico **3D ASCII em tempo real** (WebGL2 + Three.js + Post-Processing GLSL Shaders customizados + ECS modular), projetado com arquitetura **100% desacoplada e agnóstica a frameworks** (zero dependência de React, Vue ou globais externas) para acoplamento limpo no portfólio estático (`assets/js/ascii-engine.bundle.js`) ou em aplicações web modernas.

O pacote entrega dois modos nativos (`mode: 'playground' | 'mascot'`) sobre o mesmo núcleo determinístico:

- **Cyberpunk Neo-Sector Boulevard (`mode: 'playground'`)**: metrópole tridimensional em camadas de profundidade com viaduto elevado e trem *maglev*, torres neon e hologramas, árvores cibernéticas animadas por vento (`WindSystem`), veículos flutuantes e drones em rotas (`PatrolSystem`), asfalto reflexivo com poças (`waterShader.ts`) e três atmosferas coesas em um único cenário: **`day`** (*Dia*), **`night`** (*Noite*) e **`rain`** (*Com chuva*, incluindo precipitação ASCII).
- **Mascote Linux Tux 3D (`mode: 'mascot'`)**: pinguim Tux articulado de alto contraste (`TuxEntityFactory`) sobre pedestal (`TuxShowcasePlinth`), com rotação autônoma suave ou orientação por entidade primária.
- **Atlas tipográfico proporcional `5:8` sem linhas de grade**: células monoespaçadas renderizadas em Canvas 2D (`glyphAtlas.ts`) com rampa de luminância calibrada combinada a glifos estruturais direcionais (`/ \ | _ [ ]`) selecionados via detecção de bordas Sobel (profundidade + luminância), **sem divisórias/emendas entre células** e com *blend* GPU `max()` (~35% `blockBlendWeight`) para preservar detalhes geométricos finos.
- **Iluminação colorida, Sombras de Rua PCF 5-tap, ASCII Bloom & DoF**: *shadow mapping* `PCFSoftShadowMap` projetado por torres, arcos e veículos sobre a avenida; *bright-pass* + *Kawase/Gaussian blur* multi-pass antes da quantização ASCII; e linearização do `DepthTexture` para profundidade de campo suave.
- **Resolução Adaptativa HiDPI (`ResolutionController.ts`)**: suporte a `devicePixelRatio` até `2.0`, detecção automática de *tier* de resolução e transições exponenciais suaves de densidade de células ao redimensionar ou alternar *fullscreen*.
- **API de Contorno de Silhueta por Objeto sob Demanda (`objectOutline.ts`)**: malha *inverted-hull* com normais soldadas (`ensureWeldedOutlineNormals`) ativada **apenas sob demanda** por objeto/entidade (`setObjectOutline` / `applyObjectOutline`), aceitando `thickness`/`width`, `intensity`, `opacity`, `enabled`/`visible` e `highlightColor`/`color` opcional (ignorando automaticamente sub-malhas marcadas com `skipObjectOutline: true`, como `TuxShowcasePlinth`). **Inativa por padrão** — nunca atua como pós-processamento global.
- **Prevenção estrita contra *Memory Leaks* e Scroll Hijacking**: `PointerInput` 100% passivo (`{ passive: true }`) que preserva a rolagem vertical em desktop e mobile, `KeyboardInput` *opt-in* isolado por foco, hibernação via `pause()`/`resume()` sem saltos de `deltaTime`, e `.dispose()` completo de geometrias, materiais, *shadow maps*, *render targets*, *outlines* e listeners em `destroy()`.

---

## Estrutura de Diretórios

```text
/ascii-engine-module
├── /src
│   ├── /core/
│   │   ├── AsciiEngineCore.ts        # Orquestrador modular (modes: 'playground' | 'mascot')
│   │   ├── EngineLoop.ts             # Agendador rAF determinístico com deltaTime clamp e FPS
│   │   ├── LifecycleManager.ts       # ResizeObserver, visibilidade de aba e .dispose() GPU
│   │   ├── ResolutionController.ts   # Tiers HiDPI (DPR <= 2.0) e transição suave de cellSize
│   │   └── defaultConfig.ts          # Paletas (day/night/rain), rampa ASCII e merge preservando fov
│   ├── /ecs/
│   │   ├── World.ts                  # Registro enxuto de entidades e componentes puros de dados
│   │   ├── EntityBlueprint.ts        # EntityBlueprintRegistry declarativo para spawn reutilizável
│   │   └── SystemRunner.ts           # Pipeline ECS ordenado (Input, Patrol, MovementRotation,
│   │                                 # Wind, Animation, NeonPulse, RenderSync)
│   ├── /world/
│   │   ├── MapLoader.ts              # Definição declarativa do cenário Cyberpunk Neo-Sector
│   │   ├── PlaygroundSceneBuilder.ts # Avenida, torres neon, viaduto, sombras PCF e atmosferas
│   │   └── SceneComposerKit.ts       # SceneComposerKit + SceneDepthRig para camadas de cena
│   ├── /entities/
│   │   ├── TuxEntityFactory.ts       # Mascote Linux Tux 3D articulado + TuxShowcasePlinth
│   │   └── PlaygroundEntityFactory.ts# Drones, hover-cars, trem maglev, hologramas e cyber-trees
│   ├── /animation/
│   │   └── AnimationSystem.ts        # Flutuação orgânica, respiração e articulação de membros
│   ├── /vfx/
│   │   └── VfxController.ts          # Parallax/pan suave da câmera, lanterna 3D e chuva/partículas
│   ├── /input/
│   │   ├── PointerInput.ts           # Rastreamento passivo ({ passive: true }) de mouse e toque
│   │   └── KeyboardInput.ts          # Teclado opt-in isolado por foco sem roubar scroll da página
│   ├── /shaders/
│   │   ├── AsciiPostProcessor.ts     # Pipeline multi-pass (Scene + Depth -> Bloom -> ASCII 5:8)
│   │   ├── asciiShader.ts            # Shaders GLSL sem grade com Sobel e lighten block blend (~35%)
│   │   ├── waterShader.ts            # Shader GLSL de asfalto molhado / reflexos especulares
│   │   ├── glyphAtlas.ts             # Gerador de atlas tipográfico 5:8 em Canvas 2D
│   │   └── objectOutline.ts          # API sob demanda de contorno por objeto (applyObjectOutline)
│   ├── /types/
│   │   └── index.ts                  # Contratos TypeScript estritos (EngineConfig, Outline, ECS)
│   └── index.ts                      # Facade pública exportando AsciiSceneEngine e utilitários
├── integration-entry.ts              # Entrypoint IIFE para `window.ASCIIRealms` no portfólio
├── /demo                             # Sandbox HTML/CSS/TS isolado para inspeção visual
├── package.json
├── tsconfig.json
├── vite.config.ts                    # Build ESM/CJS da biblioteca (`dist/`)
├── vite.portfolio.config.ts          # Build IIFE de produção (`../assets/js/ascii-engine.bundle.js`)
└── vite.demo.config.ts               # Build estático do sandbox (`demo-dist/`)
```

---

## Comandos de Desenvolvimento e Build

```bash
cd ascii-engine-module
npm install

# Sandbox interativo local (/demo)
npm run dev

# Checagem estrita de tipos TypeScript
npm run typecheck

# Compila biblioteca isolada (ESM + CJS em dist/)
npm run build

# Gera o bundle IIFE consumido pelo portfólio (../assets/js/ascii-engine.bundle.js)
npm run build:portfolio

# Compila o sandbox estático (demo-dist/)
npm run build:demo
```

---

## Uso da Facade (`AsciiSceneEngine`)

### 1. Cenário Cyberpunk com Atmosferas (`day` | `night` | `rain`)

```ts
import { AsciiSceneEngine } from '@ancientstudio/ascii-engine-module';

const stageEl = document.getElementById('ascii-scene')!;

const engine = new AsciiSceneEngine(stageEl, {
  mode: 'playground',
  atmosphere: 'night',
  autoResponsiveDensity: true,
  blockBlendWeight: 0.35,
  bloomIntensity: 1.42,
  dofStrength: 0.34,
  windStrength: 0.62,
});

engine.mount();

// Troca de atmosfera em tempo real mantendo o mesmo cenário (Dia / Noite / Com chuva)
engine.updateConfig({ atmosphere: 'rain', windStrength: 1.52, bloomIntensity: 1.72 });
```

### 2. Contorno de Silhueta por Objeto sob Demanda (`setObjectOutline`)

O contorno nunca é ligado globalmente por padrão. Quando desejado em um objeto específico (`THREE.Object3D`, `'primary'`, nome na cena ou `EntityId` do ECS):

```ts
// Aplica contorno na entidade primária (ex.: Tux no modo 'mascot') com cor de destaque customizada
engine.setObjectOutline('primary', {
  enabled: true,
  thickness: 0.045,
  intensity: 1.35,
  opacity: 0.95,
  highlightColor: '#00F0FF',
});

// Inspeciona o estado atual do contorno
const state = engine.getObjectOutlineState('primary');

// Remove e libera recursos GPU do contorno
engine.clearObjectOutline('primary');
```

Também é possível usar os helpers puros diretamente sobre qualquer `THREE.Object3D`:

```ts
import {
  applyObjectOutline,
  getObjectOutlineState,
  clearObjectOutline,
} from '@ancientstudio/ascii-engine-module';

const handle = applyObjectOutline(myObject3D, {
  thickness: 0.04,
  highlightColor: '#FFC145',
});
handle.update({ intensity: 1.5 });
clearObjectOutline(myObject3D);
```

---

## Contrato Completo da API Pública (`AsciiSceneEngine`)

| Método | Assinatura | Descrição |
| :--- | :--- | :--- |
| `mount` | `mount(): void` | Inicializa o contexto WebGL2, constrói a cena e o pipeline ASCII, registra observadores e inicia o loop. |
| `pause` | `pause(): void` | Cancela o `requestAnimationFrame` imediatamente preservando o estado da cena. |
| `resume` | `resume(): void` | Retoma o loop sem salto de `deltaTime`. |
| `resize` | `resize(dimensions: { width: number; height: number }, immediate?: boolean): void` | Atualiza dimensões e densidade de células suavemente (ou imediatamente quando `immediate = true`). |
| `updateConfig` | `updateConfig(partial: PartialEngineConfig): void` | Atualiza atmosfera (`day`/`night`/`rain`), paleta, `cellSize`, `bloomIntensity`, `dofStrength`, `windStrength`, `blockBlendWeight` ou `fov` em tempo real. |
| `setPlayableKeyboardEnabled` | `setPlayableKeyboardEnabled(enabled: boolean): void` | Habilita ou desabilita captura opcional de teclado isolada por foco. |
| `setObjectOutline` | `setObjectOutline(target: OutlineTargetSelector, options?: ObjectOutlineOptions): ObjectOutlineHandle \| null` | Aplica ou atualiza contorno de silhueta sob demanda em um alvo específico (`Object3D`, `'primary'`, nome ou `EntityId`). |
| `clearObjectOutline` | `clearObjectOutline(target?: OutlineTargetSelector): number` | Remove e faz `.dispose()` do contorno de um alvo específico (ou de todos os alvos se omitido). |
| `getObjectOutlineState` | `getObjectOutlineState(target: OutlineTargetSelector): ResolvedObjectOutlineState \| null` | Retorna snapshot imutável da configuração ativa de contorno do alvo, ou `null`. |
| `destroy` | `destroy(): void` | Remove o `<canvas>`, desconecta observadores/listeners e executa `.dispose()` completo de recursos GPU. |
| `getState` | `getState(): 'idle' \| 'running' \| 'paused' \| 'destroyed'` | Retorna o estado atual do ciclo de vida. |
| `getConfig` | `getConfig(): EngineConfig` | Retorna snapshot imutável da configuração ativa. |
| `getStats` | `getStats(): EngineStats` | Retorna FPS suavizado, `frameTimeMs`, `cellSize`, dimensões da grade (`columns` × `rows`) e total de entidades ECS. |
| `getScene` | `getScene(): THREE.Scene \| null` | Acesso somente-leitura à `THREE.Scene` montada. |
| `getCamera` | `getCamera(): THREE.PerspectiveCamera \| null` | Acesso somente-leitura à `THREE.PerspectiveCamera` ativa. |
| `getPrimaryEntityAngles` | `getPrimaryEntityAngles(): { yaw: number; pitch: number } \| null` | Retorna `{ yaw, pitch }` em radianos da entidade primária (ex.: Tux no modo `'mascot'`). |
