//import f1 from './1-add-in-player-hover-cards/1-add-in-player-hover-cards';

export default {
    "Player Cards": async () => {
        const feature = await import('./1-add-in-player-hover-cards/1-add-in-player-hover-cards');
        feature.default();
    }
}