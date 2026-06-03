import type { SyntheticEvent } from 'react';
import { storyScenes } from '../game/gameData';

interface Props {
  unlockedStorySceneIds: string[];
  readStorySceneIds: string[];
  onRead: (sceneId: string) => void;
}

export const StoryPanel = ({ unlockedStorySceneIds, readStorySceneIds, onRead }: Props) => {
  const unlocked = storyScenes.filter((scene) => unlockedStorySceneIds.includes(scene.id));
  return (
    <section className="panel story-panel">
      <div className="section-heading"><div><p className="eyebrow">Story</p><h2>Harbor Whispers</h2></div></div>
      {unlocked.map((scene) => {
        const unread = !readStorySceneIds.includes(scene.id);
        return (
          <details key={scene.id} className={`story-card ${unread ? 'unread' : ''}`} onToggle={(event: SyntheticEvent<HTMLDetailsElement>) => event.currentTarget.open && onRead(scene.id)}>
            <summary>{unread ? '✨ ' : ''}{scene.title}</summary>
            <div className="dialogue-stack">
              {scene.lines.map((line, index) => (
                <div key={`${line.speaker}-${index}`} className="dialogue-card"><strong>{line.speaker}</strong><p>{line.text}</p></div>
              ))}
            </div>
          </details>
        );
      })}
    </section>
  );
};
