import { useCallback, useEffect, useMemo, useState } from 'react';
import { completeOrder, completeRenovation, createInitialState, generateFromGenerator, moveOrMergeItem } from './gameEngine';
import { ENERGY_REGEN_MS, MAX_ENERGY, type FloatingReward, type GameState, type GeneratorType } from './gameTypes';

const STORAGE_KEY = 'harbor-whispers-save-v1';
const todayKey = () => new Date().toISOString().slice(0, 10);

const loadState = (): GameState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return createInitialState();
    return { ...createInitialState(), ...JSON.parse(saved), lastEnergyUpdate: Date.now() };
  } catch {
    return createInitialState();
  }
};

export const useGameState = () => {
  const [state, setState] = useState<GameState>(loadState);
  const [floatingRewards, setFloatingRewards] = useState<FloatingReward[]>([]);
  const [showTutorial, setShowTutorial] = useState(() => !loadState().hasSeenTutorial);
  const [showDailyReward, setShowDailyReward] = useState(() => loadState().lastDailyRewardDate !== todayKey());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setState((current) => {
        const now = Date.now();
        const gained = Math.floor((now - current.lastEnergyUpdate) / ENERGY_REGEN_MS);
        if (gained <= 0) return current;
        return {
          ...current,
          energy: Math.min(MAX_ENERGY, current.energy + gained),
          lastEnergyUpdate: now,
        };
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const addFloatingReward = useCallback((text: string, kind: FloatingReward['kind']) => {
    const id = `${kind}-${Date.now()}-${Math.random()}`;
    setFloatingRewards((current) => [...current, { id, text, kind }]);
    window.setTimeout(() => setFloatingRewards((current) => current.filter((reward) => reward.id !== id)), 1400);
  }, []);

  const generateItem = useCallback((generatorId: GeneratorType) => {
    setState((current) => generateFromGenerator(current, generatorId));
  }, []);

  const moveItem = useCallback((fromIndex: number, toIndex: number) => {
    setState((current) => ({ ...current, board: moveOrMergeItem(current.board, fromIndex, toIndex) }));
  }, []);

  const finishOrder = useCallback((orderId: string) => {
    setState((current) => {
      const result = completeOrder(current, orderId);
      if (result.completed) {
        addFloatingReward(`+${result.completed.coinReward} coins`, 'coins');
        addFloatingReward(`+${result.completed.starReward} stars`, 'stars');
      }
      return result.state;
    });
  }, [addFloatingReward]);

  const renovate = useCallback((taskId: string, style: 'Cozy' | 'Modern' | 'Tropical') => {
    setState((current) => completeRenovation(current, taskId, style));
  }, []);

  const markSceneRead = useCallback((sceneId: string) => {
    setState((current) => current.readStorySceneIds.includes(sceneId)
      ? current
      : { ...current, readStorySceneIds: [...current.readStorySceneIds, sceneId] });
  }, []);

  const acceptTutorial = useCallback(() => {
    setShowTutorial(false);
    setState((current) => ({ ...current, hasSeenTutorial: true }));
  }, []);

  const claimDailyReward = useCallback(() => {
    setShowDailyReward(false);
    setState((current) => ({ ...current, coins: current.coins + 25, energy: Math.min(MAX_ENERGY, current.energy + 15), lastDailyRewardDate: todayKey() }));
    addFloatingReward('+25 coins', 'coins');
    addFloatingReward('+15 energy', 'energy');
  }, [addFloatingReward]);

  const toggleSound = useCallback(() => {
    setState((current) => ({ ...current, soundEnabled: !current.soundEnabled }));
  }, []);

  const resetGame = useCallback(() => {
    const fresh = createInitialState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    setState(fresh);
    setShowTutorial(true);
    setShowDailyReward(true);
  }, []);

  const isBoardEmpty = useMemo(() => state.board.every((cell) => !cell), [state.board]);

  return { state, floatingRewards, showTutorial, showDailyReward, isBoardEmpty, generateItem, moveItem, finishOrder, renovate, markSceneRead, acceptTutorial, claimDailyReward, toggleSound, resetGame };
};
