import { getOption } from '../modules/local-storage-settings';

import f1_image from './1-add-in-player-hover-cards/screenshot.jpg';
import f2_image from './2-keyboard-shortcut-to-submit-messages/screenshot.jpg';
import f3_image from './3-fix-cursor-on-space-page/screenshot.jpg';

export default [
    {
        name: "Player Cards",
        description: "Adds information cards about a player when hovering over a username",
        image: f1_image,
        setup: async () => {
            const feature = await import('./1-add-in-player-hover-cards/1-add-in-player-hover-cards');
            feature.default();
        },
        key: 'player-cards',
        active: getOption("player-cards")
    },
    {
        name: "CTRL+Enter to submit",
        description: "Adds ability to submit messages and forum posts with CTRL+Enter",
        image: f2_image,
        setup: async () => {
            const feature = await import('./2-keyboard-shortcut-to-submit-messages/2-keyboard-shortcut-to-submit-messages');
            feature.default();
        },
        key: 'enter-to-submit',
        active: getOption("enter-to-submit")
    },
    {
        name: "Fix cursor on space page",
        description: "Adds back in the hand cursor when hovering over movable cells on the space page",
        image: f3_image,
        setup: async () => {
            const feature = await import('./3-fix-cursor-on-space-page/3-fix-cursor-on-space-page');
            feature.default();
        },
        key: 'fix-space-cursor',
        active: getOption("fix-space-cursor")
    }
];
