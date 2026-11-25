import {
  AsciiSceneEngine,
  type AtmosphereMode,
  DEFAULT_PALETTE,
  type PartialEngineConfig,
  type ThemePalette,
} from '../src/index';

const ATMOSPHERE_PRESETS: Record<
  AtmosphereMode,
  { palette: ThemePalette; windStrength: number; bloomIntensity: number }
> = {
  night: {
    palette: { ...DEFAULT_PALETTE },
    windStrength: 0.62,
    bloomIntensity: 0.24,
  },
  day: {
    palette: {
      background: '#162029',
      warmLight: '#4A7C7E',
      warmCore: '#8A99A6',
      coolAmbient: '#7A8894',
      foliageAccent: '#2A3540',
      cursorLight: '#8A99A6',
    },
    windStrength: 0.42,
    bloomIntensity: 0.16,
  },
  rain: {
    palette: {
      background: '#0A0F14',
      warmLight: '#4A7C7E',
      warmCore: '#8A99A6',
      coolAmbient: '#5E6C78',
      foliageAccent: '#2A3540',
      cursorLight: '#6E7B87',
    },
    windStrength: 1.45,
    bloomIntensity: 0.28,
  },
};

const stageEl = document.getElementById('engine-stage') as HTMLElement;
const statusDot = document.getElementById('status-dot') as HTMLElement;
const statePill = document.getElementById('engine-state-pill') as HTMLElement;
const statFps = document.getElementById('stat-fps') as HTMLElement;
const statCell = document.getElementById('stat-cell') as HTMLElement;
const statGrid = document.getElementById('stat-grid') as HTMLElement;
const logList = document.getElementById('lifecycle-log') as HTMLUListElement;

const btnPause = document.getElementById('btn-pause') as HTMLButtonElement;
const btnResume = document.getElementById('btn-resume') as HTMLButtonElement;
const btnDestroy = document.getElementById('btn-destroy') as HTMLButtonElement;
const btnRemount = document.getElementById('btn-remount') as HTMLButtonElement;
const btnHudPing = document.getElementById('btn-hud-ping') as HTMLButtonElement;
const hudClickCountEl = document.getElementById('hud-click-count') as HTMLElement;
const btnToggleResize = document.getElementById('btn-toggle-resize') as HTMLButtonElement;

const inputCell = document.getElementById('input-cell') as HTMLInputElement;
const inputBloom = document.getElementById('input-bloom') as HTMLInputElement;
const inputEdge = document.getElementById('input-edge') as HTMLInputElement;
const inputDof = document.getElementById('input-dof') as HTMLInputElement;

const valCell = document.getElementById('val-cell') as HTMLElement;
const valBloom = document.getElementById('val-bloom') as HTMLElement;
const valEdge = document.getElementById('val-edge') as HTMLElement;
const valDof = document.getElementById('val-dof') as HTMLElement;

let engine: AsciiSceneEngine | null = null;
let hudClicks = 0;
let activePresetKey: AtmosphereMode = 'night';

function appendLog(message: string): void {
  const li = document.createElement('li');
  const time = new Date().toLocaleTimeString('pt-BR', { hour12: false });
  li.textContent = `[${time}] ${message}`;
  logList.prepend(li);
  while (logList.children.length > 25) {
    logList.removeChild(logList.lastElementChild!);
  }
}

function syncUiState(): void {
  const state = engine ? engine.getState() : 'destroyed';
  statePill.textContent = state.toUpperCase();

  statusDot.classList.remove('paused', 'destroyed');
  if (state === 'paused') statusDot.classList.add('paused');
  if (state === 'destroyed') statusDot.classList.add('destroyed');

  btnPause.disabled = state !== 'running';
  btnResume.disabled = state !== 'paused';
  btnDestroy.disabled = state === 'destroyed';
  btnRemount.disabled = state !== 'destroyed';

  if (state === 'destroyed') {
    statFps.textContent = '--';
    statCell.textContent = '--';
    statGrid.textContent = '--';
  }
}

function currentControlsToConfig(): PartialEngineConfig {
  const preset = ATMOSPHERE_PRESETS[activePresetKey] ?? ATMOSPHERE_PRESETS.night;
  return {
    atmosphere: activePresetKey,
    palette: preset.palette,
    windStrength: preset.windStrength,
    cellSize: Number(inputCell.value),
    bloomIntensity: Number(inputBloom.value),
    edgeStrength: Number(inputEdge.value),
    dofStrength: Number(inputDof.value),
  };
}

function createAndMountEngine(): void {
  if (engine) {
    engine.destroy();
    engine = null;
  }

  engine = new AsciiSceneEngine(stageEl, {
    ...currentControlsToConfig(),
    callbacks: {
      onMount: () => {
        appendLog('mount() -> WebGL + Shaders + ResizeObserver ativos');
        syncUiState();
      },
      onPause: () => {
        appendLog('pause() -> Loop rAF suspenso (0% GPU)');
        syncUiState();
      },
      onResume: () => {
        appendLog('resume() -> Loop retomado sem salto de deltaTime');
        syncUiState();
      },
      onDestroy: () => {
        appendLog('destroy() -> Canvas removido e recursos GPU .dispose()');
        syncUiState();
      },
      onFpsUpdate: (stats) => {
        statFps.textContent = String(stats.fps);
        statCell.textContent = String(stats.activeCellSize);
        statGrid.textContent = `${stats.gridColumns}x${stats.gridRows}`;
      },
      onError: (err) => {
        appendLog(`ERRO: ${err.message}`);
      },
    },
  });

  engine.mount();
  const initialStats = engine.getStats();
  statCell.textContent = String(initialStats.activeCellSize);
  statGrid.textContent = `${initialStats.gridColumns}x${initialStats.gridRows}`;
}

// Wire Lifecycle Controls
btnPause.addEventListener('click', () => {
  engine?.pause();
});

btnResume.addEventListener('click', () => {
  engine?.resume();
});

btnDestroy.addEventListener('click', () => {
  engine?.destroy();
  engine = null;
  syncUiState();
});

btnRemount.addEventListener('click', () => {
  createAndMountEngine();
});

// Wire HUD Overlay Click-through Proof
btnHudPing.addEventListener('click', () => {
  hudClicks += 1;
  hudClickCountEl.textContent = String(hudClicks);
  appendLog(`HUD click #${hudClicks} recebido sobre o canvas WebGL (z-index OK)`);
});

btnToggleResize.addEventListener('click', () => {
  const isCompact = stageEl.classList.toggle('compact-box');
  appendLog(
    isCompact
      ? 'Container reduzido (72% largura) -> ResizeObserver adaptando grade'
      : 'Container restaurado (100% largura) -> ResizeObserver adaptando grade'
  );
});

// Wire Real-Time Config Sliders
inputCell.addEventListener('input', () => {
  const v = Number(inputCell.value);
  valCell.textContent = `${v}px`;
  engine?.updateConfig({ cellSize: v });
  if (engine) {
    const s = engine.getStats();
    statCell.textContent = String(s.activeCellSize);
    statGrid.textContent = `${s.gridColumns}x${s.gridRows}`;
  }
});

inputBloom.addEventListener('input', () => {
  const v = Number(inputBloom.value);
  valBloom.textContent = v.toFixed(2);
  engine?.updateConfig({ bloomIntensity: v });
});

inputEdge.addEventListener('input', () => {
  const v = Number(inputEdge.value);
  valEdge.textContent = v.toFixed(2);
  engine?.updateConfig({ edgeStrength: v });
});

inputDof.addEventListener('input', () => {
  const v = Number(inputDof.value);
  valDof.textContent = v.toFixed(2);
  engine?.updateConfig({ dofStrength: v });
});

// Wire Atmosphere Modes (Noite / Dia / Com chuva)
document.querySelectorAll<HTMLButtonElement>('[data-preset]').forEach((chip) => {
  chip.addEventListener('click', () => {
    const rawKey = chip.dataset.preset;
    const key: AtmosphereMode =
      rawKey === 'day' || rawKey === 'rain' ? rawKey : 'night';
    activePresetKey = key;

    document.querySelectorAll('[data-preset]').forEach((el) => el.classList.remove('active'));
    chip.classList.add('active');

    const preset = ATMOSPHERE_PRESETS[key];
    engine?.updateConfig({
      atmosphere: key,
      palette: preset.palette,
      windStrength: preset.windStrength,
      bloomIntensity: preset.bloomIntensity,
    });
    appendLog(`updateConfig({ atmosphere: "${key}" }) aplicado no cenário único`);
  });
});

// Initial boot
createAndMountEngine();
