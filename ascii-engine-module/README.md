# `@ancientstudio/ascii-engine-module`

Motor gráfico **3D ASCII em tempo real** (WebGL2 + Three.js + Post-Processing GLSL Shaders customizados + ECS modular enxuto), projetado com arquitetura **100% desacoplada e agnóstica a frameworks** (zero dependência de React, Vue ou globais externas) para acoplamento limpo no portfólio estático (`assets/js/ascii-engine.bundle.js`) ou em aplicações web modernas.

O pacote entrega dois modos nativos (`mode: 'playground' | 'mascot'`) sobre o mesmo núcleo determinístico:

- **Cyber Noir + Entropism Boulevard (`mode: 'playground'`)**: avenida urbana entrópica unificada (`cyberpunk-citadel`) sob estética **Cyber Noir + Entropism + Techwear/Darkwear** — céu entrópico `#0C1217`, piso ASCII `#1A222A` (`waterShader.ts`), estruturas/ruínas brutalistas `#2A3540`, protagonista *Techwear/Darkwear* (`#14171C` / `#3B424C`) com **braço cibernético mecânico articulado** (`#6E7B87` / `#8A99A6`, sem espada ou arma luminosa) e acento pontual discreto `#4A7C7E`. Opera com **FOV de `106°`**, câmera centrada que acompanha suavemente o personagem (`CameraFollowSystem`), locomoção por clique/toque no chão (`NavigationTargetComponent` + raycast de solo em `InputSystem`), ciclo de caminhada orgânico guiado por `deltaTime` (`AnimationSystem`) e três atmosferas coesas sem luzes estouradas: **`day`** (*Dia*), **`night`** (*Noite*) e **`rain`** (*Com chuva*).
- **Estúdio Minimalista Linux Tux 3D (`mode: 'mascot'`)**: mascote Tux articulado e sem facetas duras (`TuxEntityFactory`, com `includeShowcaseRig: false` por padrão no palco do mascote; o pedestal `TuxShowcasePlinth` permanece opcional via `includeShowcaseRig: true`) sobre o palco minimalista `MascotStageBuilder` — fundo contínuo `#13222E` (`MASCOT_BACKDROP_HEX`) + piso horizontal `#1D2B36` (`MASCOT_FLOOR_HEX`), iluminação de estúdio equilibrada (*key*, *fill*, *hemi* e duplo *rim* discreto), sombra suave PCF + *contact AO* e reflexo difuso sincronizado em `yaw`, 100% quantizados em ASCII puro e totalmente inertes a mouse/toque (`fov: 38°`).
- **Atlas tipográfico proporcional `5:8` sem linhas de grade**: células monoespaçadas (`0.625`, `40×64` @ 1x e `60×96` @ HiDPI) renderizadas em Canvas 2D (`glyphAtlas.ts`) com rampa de luminância calibrada, glifos estruturais direcionais (`/ \ | _ [ ]`) selecionados via Sobel (profundidade + luminância), guarda exata de meio-texel (`0.55 / uAtlasTileSize`) **sem divisórias/emendas entre células** e *blend* GPU `max()` (~35% `blockBlendWeight`) com blocos `░▒▓█` *full-bleed*.
- **Iluminação calibrada, Sombras PCF 5-tap, ASCII Bloom & DoF**: *shadow mapping* `PCFSoftShadowMap` em tempo real no asfalto e no piso do estúdio; *bright-pass* + *Kawase/Gaussian blur* separável antes da quantização ASCII; e linearização do `DepthTexture` para profundidade de campo suave.
- **Resolução Adaptativa HiDPI (`ResolutionController.ts`)**: teto de `devicePixelRatio` (`<= 2.0` em desktop, `<= 1.5` em mobile *coarse pointer*), tetos anti-ruído de colunas (`36..190` no `playground`, `24..78` no `mascot`) e transições exponenciais suaves de densidade de célula ao redimensionar ou alternar *fullscreen*, estabilizando em pixels inteiros exatos.
- **API de Contorno de Silhueta por Objeto sob Demanda (`objectOutline.ts`)**: malha *inverted-hull* (`THREE.BackSide`) com normais de canto soldadas (`ensureWeldedOutlineNormals`) ativada **apenas sob demanda** por alvo (`setObjectOutline` / `applyObjectOutline`), aceitando `thickness`/`width` (`0.05..8.0`, padrão `1.0`), `intensity`, `opacity`, `enabled`/`visible` e `highlightColor`/`color` opcional (padrão `#7DF9FF`, ignorando automaticamente sub-malhas com `skipObjectOutline: true` ou `TuxShowcasePlinth`). **Inativa por padrão** — nunca atua como pós-processamento global.
- **Prevenção estrita contra *Memory Leaks* e Scroll Hijacking**: `PointerInput` 100% passivo (`{ passive: true }`, `touch-action: pan-y`) que preserva a rolagem vertical em desktop e mobile, `KeyboardInput` estritamente *opt-in* isolado por foco, hibernação via `pause()`/`resume()` sem saltos de `deltaTime`, e `.dispose()` recursivo completo de geometrias, materiais, texturas, *shadow maps*, *render targets*, *outlines* e listeners em `destroy()`.

---

## Estrutura de Diretórios

```text
/ascii-engine-module
├── /src
│   ├── /core/
│   │   ├── AsciiEngineCore.ts        # Orquestrador modular (modes: 'playground' | 'mascot')
│   │   ├── EngineLoop.ts             # Agendador rAF determinístico com clamp de deltaTime e FPS
│   │   ├── LifecycleManager.ts       # ResizeObserver, IntersectionObserver, visibilidade e .dispose() GPU
│   │   ├── ResolutionController.ts   # Tiers HiDPI (DPR <= 2.0 / 1.5), guardrails de colunas e transição 5:8
│   │   └── defaultConfig.ts          # Rampa ASCII, paleta base e merge imutável preservando fov
│   ├── /ecs/
│   │   ├── World.ts                  # Store enxuto de entidades e componentes puros de dados/estado
│   │   └── SystemRunner.ts           # Contratos EcsSystem/SystemContext e sistemas ECS ordenados por prioridade
│   ├── /world/
│   │   ├── GlbSceneLoader.ts         # Loader Draco/WebP self-hosted, calibração de normal maps e NLA clips
│   │   ├── SceneGlbLoader.ts         # Loader com pool de Web Workers, métricas de telemetria e .dispose()
│   │   ├── UrbanGlbSceneBuilder.ts   # Iluminação urbana, calçada (SidewalkBounds), tráfego 30s e day/night/rain
│   │   └── MascotStageBuilder.ts     # Palco minimalista ASCII (#13222E fundo + #1D2B36 piso + sombra/reflexo)
│   ├── /entities/
│   │   └── TuxEntityFactory.ts       # Mascote Linux Tux 3D articulado (malhas suaves + TuxShowcasePlinth opt-in)
│   ├── /animation/
│   │   └── AnimationSystem.ts        # Cross-fade NLA (Idle/Walking/Casting) e animação procedural do mascote
│   ├── /vfx/
│   │   └── VfxController.ts          # Respiração da câmera do mascote, luz de cursor e partículas 3D de chuva
│   ├── /input/
│   │   ├── PointerInput.ts           # Rastreamento passivo ({ passive: true }, pan-y) de mouse e toque
│   │   └── KeyboardInput.ts          # Teclado WASD + E isolado por foco e seguro para formulários/atalhos
│   ├── /shaders/
│   │   ├── AsciiPostProcessor.ts     # Pipeline multi-pass (Scene + Depth -> Normal-Map Pass -> Bloom -> ASCII 5:8)
│   │   ├── normalMaps.ts             # Normal maps procedurais zero-CDN, NormalPassMaterialCache e vetores de luz
│   │   ├── asciiShader.ts            # Iluminação direcional por normais (N·L, N·H, Fresnel rim), Sobel e reflexos
│   │   ├── glyphAtlas.ts             # Gerador de atlas tipográfico 5:8 em Canvas 2D com pontilhado Bayer
│   │   └── objectOutline.ts          # API sob demanda de contorno por objeto (applyObjectOutline)
│   ├── /types/
│   │   └── index.ts                  # Contratos TypeScript estritos (EngineConfig, Stats, Outline, Resolution)
│   └── index.ts                      # Facade pública exportando AsciiSceneEngine e módulos utilitários
├── integration-entry.ts              # Entrypoint IIFE para `window.ASCIIRealms` no portfólio
├── /demo                             # Sandbox HTML/CSS/TS isolado para inspeção visual e telemetria
├── package.json
├── tsconfig.json                     # Configuração TypeScript estrita (strict + noUnusedLocals/Parameters)
├── tsconfig.build.json               # Emissão de declarações .d.ts em dist/
├── vite.config.ts                    # Build ESM/CJS da biblioteca (`dist/`)
├── vite.portfolio.config.ts          # Build IIFE de produção (`../assets/js/ascii-engine.bundle.js`)
└── vite.demo.config.ts               # Build estático do sandbox (`dist-demo/`)
```

---

## Regras Obrigatórias para Novas Implementações

Toda nova implementação, cena, entidade, sistema, *shader* ou refatoração dentro de `ascii-engine-module` **deve obedecer estritamente** às cinco diretrizes arquiteturais e estéticas abaixo:

### 1. Arquitetura Modular Inspirada em ECS Enxuto (Separação de Responsabilidades)

- **Componentes exclusivamente de dados/estado (`src/ecs/World.ts`)**: componentes (`Transform`, `Velocity`, `RotationTarget`, `AnimationState`, `CharacterAnimation`, `SidewalkBounds`, `TrafficCycle`, `ForegroundOccluders`, `Renderable`, `DepthLayer`, `LifecycleTag`, `InputState`, `NavigationTarget`, `CameraFollow`) devem conter apenas estado estruturado — nunca *listeners* de DOM ou chamadas diretas ao renderizador.
- **Sistemas focados e ordenados deterministicamente (`SystemRunner.ts` / `AnimationSystem.ts`)**: cada sistema cumpre uma única responsabilidade sobre consultas `world.query(...)`, respeitando a ordem explícita de prioridades:
  - `mode: 'playground'`: `InputSystem (10)` → `TrafficFlowSystem (15)` → `MovementRotationSystem (20)` → `CharacterAnimationSystem (28)` → `AnimationSystem (30)` → `CameraFollowSystem (38)` → `LineOfSightOcclusionSystem (39)` → `RenderSyncSystem (40)`.
  - `mode: 'mascot'`: apenas `MovementRotationSystem (20)` → `AnimationSystem (30)` → `RenderSyncSystem (40)`.
- **Builders, Loaders e Factories (`src/world/`, `src/entities/`)**: carregamento Draco/WebP, calibração de *normal maps*, construção de iluminação de palco e registro inicial de componentes ficam isolados em `GlbSceneLoader`, `SceneGlbLoader`, `UrbanGlbSceneBuilder`, `MascotStageBuilder` e `TuxEntityFactory`.
- **Proibição de acoplamento no renderizador ASCII**: nunca embutir lógica de input, animação de personagens/objetos ou controle de câmera dentro de `AsciiPostProcessor` ou dos *shaders* GLSL (`asciiShader.ts`, `normalMaps.ts`, `glyphAtlas.ts`). O pipeline ASCII consome exclusivamente os *render targets* (`tScene`, `tNormal`, `tDepth`, `tBloom`) e *uniforms* declarativos/vetoriais de cena.
- **Sem *over-engineering* de motor AAA**: manter o ECS enxuto baseado em `Map<EntityId, Component>`, evitando *containers* de injeção/reflexão, compiladores de arquétipos por *bitmask*, motores de física pesados ou abstrações especulativas sem uso real nas cenas do módulo.

### 2. Coerência Estilística ASCII Integral, Normais de Superfície e Higiene de Código Residual

- **Fidelidade ASCII em 100% da cena**: personagem/mascote, cenário arquitetônico, asfalto, calçada, veículo, piso, plano de fundo (*backdrop*), sombras projetadas, reflexos planares e efeitos atmosféricos devem atravessar e ser calibrados para a quantização ASCII `5:8` sem linhas de grade (`glyphAtlas.ts` + `asciiShader.ts`), preservando contornos estruturais Sobel (`/ \ | _`) e textura tipográfica legível sem chuvisco de ruído.
- **Volume 3D guiado por normais e *normal maps***:
  - Preservar todos os `normalTexture`s embutidos do `.glb` (`real_road`, `concrete_pavement`, `tiles`, `wall`, `hous4`, `roof`, `tireProtector`) e complementar superfícies planas sem mapa (`Player_Rig`, carroceria de `Carro_Grupo`, muros/postes lisos) com *normal maps* procedurais leves (`src/shaders/normalMaps.ts`, `DataTexture` `64×64` zero-CDN).
  - No Pass 2 (`normalTarget`), usar `NormalPassMaterialCache` com escala macro controlada e exclusão estrita de malhas transparentes/VFX (`userData.skipNormalPass = true`) para alimentar `tNormal` com relevo real sem gerar granulação ruidosa de caracteres.
  - No *shader* composto (`asciiShader.ts`), extrair os vetores direcionais de luz (`uKeyLightViewDir`, `uRimLightViewDir`) e vertical do mundo (`uWorldUpViewDir`) em *view space* para modular incidência difusa (`N·L`), auto-oclusão planar de faces opostas à luz, brilho especular Blinn-Phong (`N·H`), recorte Fresnel de borda e perturbação normal dos reflexos úmidos do solo (`sampleGroundReflection`).
- **Zero planos crus ou artefatos fora do pipeline**:
  - É proibido introduzir planos chapados não quantizados, sobreposições HTML/CSS fingindo geometria 3D, *clamps* de margem UV que gerem fendas/grades entre células (como `clamp(glyphUv, 0.04, 0.96)`), listras de *scanline* artificiais ou *Z-fighting*/*flatShading* facetado em malhas orgânicas (como o torso/peito do Tux).
  - Contornos de silhueta (`objectOutline.ts`) permanecem **estritamente sob demanda por alvo** (`THREE.Object3D`), nunca ativados globalmente na cena por padrão, e pisos/planos de fundo devem sinalizar `userData.skipObjectOutline = true` quando aplicável.
- **Remoção imediata de código morto ou fora do padrão**: qualquer cenário legado, gerador procedural sem consumidor, *preset* descontinuado, *uniform* órfão ou protótipo fora do pipeline ASCII deve ser removido na mesma alteração (nunca deixado comentado ou dormente). O módulo exige compilação limpa com `strict: true`, `noUnusedLocals: true` e `noUnusedParameters: true`, além da regeneração de `assets/js/ascii-engine.bundle.js` (`npm run build:portfolio`) sempre que o código-fonte público mudar.

### 3. Paletas Controladas, Sóbrias e Sem Excesso de Luzes Saturadas

- **Bases escuras, dessaturadas e hierarquia de luminância**: fundos, pisos e volumes estruturais devem partir de tons escuros e de baixa saturação (ardósia, petróleo, obsidiana, aço entrópico) com separação clara de valor para sustentar a leitura dos glifos — exemplarmente a escada tonal de estúdio do mascote: pelagem dorsal do Tux (`#0B1017`) < fundo `MASCOT_BACKDROP_HEX` (`#13222E`) < piso `MASCOT_FLOOR_HEX` (`#1D2B36`), e a paleta **Cyber Noir + Entropism** do `playground`: céu/fundo entrópico `#0C1217`, estruturas `#2A3540`, tons ambientes `#6E7B87`/`#8A99A6`, acento frio `#4A7C7E` e focos quentes âmbar contidos nas vitrines, postes e faróis.
- **Acentos contidos e iluminação exclusivamente ASCII**: evitar saturação neon excessiva, excesso de `PointLight`s simultâneas ou `bloomIntensity`/`emissiveIntensity` estourados que saturem a luminância em `1.0` e colapsem toda a área em caracteres sólidos uniformes (`blockTier` nunca emite bloco 100% sólido `█`). Priorizar esquema equilibrado de *key light* direcional + *fill* controlado + *rim light* discreto para recorte de silhueta.
- **Reuso de materiais e texturas**: compartilhar *normal maps* procedurais (`ProceduralNormalMapSet`) e materiais cacheados de normal pass (`NormalPassMaterialCache`), evitando duplicar instâncias por malha.

### 4. Regras de Câmera e Isolamento de Interação por Modo

- **`mode: 'mascot'` (`#penguin-stage`)**: palco estritamente contemplativo (`fov: 38°`) e 100% inerte a ponteiro/toque/teclado — nunca anexar `PointerInput` ou `KeyboardInput`, manter `cursorLight` zerada (`intensity = 0`) e zero partículas (`particleCount = 0`), travar posição/alvo da câmera e restringir qualquer rotação externa ao eixo horizontal (`yaw`), sem inclinação (`pitch`) nem telemetria reativa a cursor.
- **`mode: 'playground'` (`#ascii-scene`)**:
  - Câmera elevada 3/4 a `45°` (`fov: 58°`, `URBAN_CAMERA_FOLLOW_DEFAULTS`), acompanhando suavemente `Player_Rig` (`lerp`) via `CameraFollowSystem`, com locomoção `WASD` restrita à calçada (`SidewalkBounds` + `THREE.MathUtils.clamp`), interação `E` (`Casting`) e suporte a clique/toque no solo (`PointerInput.consumeTap()` + raycast de plano em `InputSystem`).
  - Todo *listener* de mouse/toque deve ser passivo (`{ passive: true }`) com `touch-action: pan-y` no container, **nunca** bloqueando a rolagem vertical da página.
  - `KeyboardInput` deve permanecer desabilitado por padrão (`enableKeyboard: false`); quando habilitado explicitamente, exige foco ativo em `focusTarget`, ignora `<input>`, `<textarea>`, `<select>` e `[contenteditable]` e jamais intercepta atalhos com `Ctrl`/`Cmd`/`Alt`.
  - Preservar `config.fov` explícito em redimensionamentos e respeitar os *guardrails* adaptativos de `ResolutionController` (DPR e limites de colunas) para evitar poeira subpixel em telas 4K ou ilegibilidade em telas móveis.

### 5. Ciclo de Vida Limpo (`deltaTime`, Listeners/Timers e `.dispose()`)

- **`deltaTime` seguro e zero alocações por frame**:
  - Toda integração temporal, suavização de câmera/rotação e transição de resolução deve usar o `dt` limitado pelo `EngineLoop` (`[0.0001, 0.1]` s) com amortecimento exponencial independente de taxa de quadros (`1 - Math.exp(-k * dt)`).
  - `pause()`, `resume()` e trocas de visibilidade da aba devem zerar o marcador do frame anterior (`lastTimestamp = null`) para impedir saltos bruscos ao retomar.
  - Não alocar objetos temporários (`new THREE.Vector3()`, `new THREE.Color()`, `Float32Array`, *closures*) dentro de `renderFrame()` ou `System.update()`; reutilizar instâncias pré-alocadas na classe/sistema.
- **Remoção explícita de listeners, observadores e timers**: todo `addEventListener`, `ResizeObserver`, `IntersectionObserver`, `requestAnimationFrame` pendente e `setTimeout`/`setInterval` deve possuir limpeza simétrica registrada em `LifecycleManager.registerCleanup(...)` (ou nos métodos `.detach()`/`.stop()` invocados por `AsciiEngineCore.destroy()`).
- **Descarte completo de recursos GPU e DOM em `destroy()` / `unmount`**: liberar explicitamente toda `BufferGeometry`, `Material` (incluindo arrays de materiais), `Texture` (`CanvasTexture` do atlas de glifos ao recriar ou destruir, `DepthTexture` e `WebGLRenderTarget`s do bloom/cena), `Light.shadow.map` e cascas de `objectOutline` via `World.clear(true)`, `LifecycleManager.disposeObject3D(scene)`, `AsciiPostProcessor.dispose()` e `renderer.dispose()`, removendo o `<canvas>` do container sem deixar referências órfãs.

---

## Comandos de Desenvolvimento e Build

```bash
cd ascii-engine-module
npm install

# Sandbox interativo local (/demo)
npm run dev

# Checagem estrita de tipos TypeScript
npm run typecheck

# Compila biblioteca isolada (ESM + CJS + .d.ts em dist/)
npm run build

# Gera o bundle IIFE consumido pelo portfólio (../assets/js/ascii-engine.bundle.js)
npm run build:portfolio

# Compila o sandbox estático (dist-demo/)
npm run build:demo
```

---

## Assets 3D (`.glb`) e Decoder Draco Self-Hosted (Zero CDN)

Para preservar a política estrita de **zero CDN externa** e manter total compatibilidade entre o subpath `/AncientStudio/` do GitHub Pages e a raiz `/` do container `Dockerfile` na Vercel, todos os assets 3D e binários de decodificação são servidos localmente por **caminhos relativos** (`./assets/...`):

- **Modelo 3D otimizado (Draco + WebP `1024px`)**: `./assets/models/cena_completa.glb`
  - Comprimido com `KHR_draco_mesh_compression` + `EXT_texture_webp` (`<= 1024×1024`), sem uso de Git LFS.
  - Hierarquia interna preservada integralmente: nós raiz `Cidade_Sketchfab_model`, `Player_Rig` e `Carro_Grupo`, além das NLA animation tracks `Idle`, `Walking` e `Casting`.
- **Decoder Draco oficial (`three/examples/jsm/libs/draco/`)**: `./assets/draco/`
  - Contém `draco_decoder.js`, `draco_decoder.wasm` e `draco_wasm_wrapper.js` (Apache-2.0, mesmo padrão self-hosted de `./assets/fonts/`).
  - Ao instanciar `GLTFLoader` + `DRACOLoader` no `ascii-engine-module`, configure sempre o caminho relativo `./assets/draco/` (nunca URLs externas como `gstatic.com`):

```ts
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('./assets/draco/');

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

const gltf = await gltfLoader.loadAsync('./assets/models/cena_completa.glb');
// Nós preservados: 'Cidade_Sketchfab_model', 'Player_Rig', 'Carro_Grupo'
// NLA tracks preservadas em gltf.animations: 'Idle', 'Walking', 'Casting'
// Lembre-se de chamar dracoLoader.dispose() no ciclo de destroy()/LifecycleManager!
```

---

## Uso da Facade (`AsciiSceneEngine`)

### 1. Cenário Cyber Noir + Entropism com Atmosferas (`day` | `night` | `rain`)

```ts
import { AsciiSceneEngine } from '@ancientstudio/ascii-engine-module';

const stageEl = document.getElementById('ascii-scene')!;

const engine = new AsciiSceneEngine(stageEl, {
  mode: 'playground',
  fov: 106,
  atmosphere: 'night',
  autoResponsiveDensity: true,
  blockBlendWeight: 0.18,
  bloomIntensity: 0.24,
  dofStrength: 0.20,
  windStrength: 0.62,
});

engine.mount();

// Troca de atmosfera em tempo real mantendo o mesmo cenário (Dia / Noite / Com chuva)
engine.updateConfig({ atmosphere: 'rain', windStrength: 1.45, bloomIntensity: 0.28 });
```

### 2. Contorno de Silhueta por Objeto sob Demanda (`setObjectOutline`)

O contorno nunca é ligado globalmente por padrão. Quando desejado em um objeto específico (`THREE.Object3D`, `'primary'`, nome na cena ou `EntityId` do ECS):

```ts
// Aplica contorno na entidade primária (ex.: Tux no modo 'mascot') com destaque sóbrio
engine.setObjectOutline('primary', {
  enabled: true,
  thickness: 1.2,
  intensity: 1.6,
  opacity: 0.95,
  highlightColor: '#9AD0F0',
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
  thickness: 1.0,
  highlightColor: '#7DF9FF',
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
| `resize` | `resize(dimensions?: { width: number; height: number }, immediate?: boolean): void` | Atualiza dimensões e densidade de células suavemente (ou imediatamente quando `immediate = true`). |
| `updateConfig` | `updateConfig(partial: PartialEngineConfig): void` | Atualiza atmosfera (`day`/`night`/`rain`), paleta, `cellSize`, `bloomIntensity`, `dofStrength`, `windStrength`, `blockBlendWeight` ou `fov` em tempo real. |
| `setPlayableKeyboardEnabled` | `setPlayableKeyboardEnabled(enabled: boolean): void` | Habilita ou desabilita captura opcional de teclado isolada por foco (sem efeito em `mode: 'mascot'`). |
| `setObjectOutline` | `setObjectOutline(target: OutlineTargetSelector, options?: ObjectOutlineOptions): ObjectOutlineHandle \| null` | Aplica ou atualiza contorno de silhueta sob demanda em um alvo específico (`Object3D`, `'primary'`, nome ou `EntityId`). |
| `clearObjectOutline` | `clearObjectOutline(target?: OutlineTargetSelector): number` | Remove e faz `.dispose()` do contorno de um alvo específico (ou de todos os alvos rastreados se omitido). |
| `getObjectOutlineState` | `getObjectOutlineState(target: OutlineTargetSelector): ResolvedObjectOutlineState \| null` | Retorna snapshot imutável da configuração ativa de contorno do alvo, ou `null`. |
| `destroy` | `destroy(): void` | Remove o `<canvas>`, desconecta observadores/listeners e executa `.dispose()` completo de recursos GPU. |
| `getState` | `getState(): 'idle' \| 'running' \| 'paused' \| 'destroyed'` | Retorna o estado atual do ciclo de vida. |
| `getConfig` | `getConfig(): EngineConfig` | Retorna snapshot imutável da configuração ativa. |
| `getStats` | `getStats(): EngineStats` | Retorna `fps`, `frameTimeMs`, `activeCellSize`, `gridColumns`, `gridRows`, `drawCalls` e `triangles`. |
| `getScene` | `getScene(): THREE.Scene \| null` | Acesso à `THREE.Scene` ativa para inspeção ou composição externa controlada. |
| `getCamera` | `getCamera(): THREE.PerspectiveCamera \| null` | Acesso à `THREE.PerspectiveCamera` ativa. |
| `getWorld` | `getWorld(): World` | Acesso ao store ECS (`World`) da instância. |
| `getBlueprintRegistry` | `getBlueprintRegistry(): EntityBlueprintRegistry \| null` | Acesso ao registro declarativo de blueprints ativo no modo `'playground'`. |
| `getDepthRig` | `getDepthRig(): SceneDepthRig \| null` | Acesso aos grupos de profundidade (`foreground`, `midground`, `background`, `sky`) no modo `'playground'`. |
| `getPrimaryEntityAngles` | `getPrimaryEntityAngles(): { yaw: number; pitch: number } \| null` | Retorna `{ yaw, pitch }` em radianos da entidade primária. |

Além da classe `AsciiSceneEngine`, o entrypoint público (`src/index.ts` e `window.ASCIIRealms` via `integration-entry.ts`) reexporta os construtores e constantes modulares para composição e testes automatizados: `EngineLoop`, `LifecycleManager`, `computeAdaptiveResolution`, `detectResolutionTier`, `ResolutionTransitionController`, `World`, `EntityBlueprintRegistry`, `SystemRunner` (e seus sistemas), `MapLoader`, `MascotStageBuilder` (`MASCOT_BACKDROP_HEX`, `MASCOT_FLOOR_HEX`), `PlaygroundSceneBuilder`, `SceneComposerKit`, `SceneDepthRig`, `TuxEntityFactory`, `PlaygroundEntityFactory`, `VfxController`, `PointerInput`, `KeyboardInput`, `AsciiPostProcessor`, `createGlyphAtlas` e os helpers de `objectOutline`.
