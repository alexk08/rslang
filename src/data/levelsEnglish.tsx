interface Levels {
    id: number,
    title: string,
    name: string
}

const levelsEnglish: Array<Levels> = [
    {
        id: 0,
        title: 'A1',
        name: 'Elementary'
    },
    {
        id: 1,
        title: 'A2',
        name: 'Pre-Intermediate'
    },
    {
        id: 2,
        title: 'B1',
        name: 'Intermediate'
    },
    {
        id: 3,
        title: 'B2',
        name: 'Upper-Intermediate'
    },
    {
        id: 4,
        title: 'C1',
        name: 'Advanced'
    },
    {
        id: 5,
        title: 'C2',
        name: 'Proficiency'
    }
];

export {levelsEnglish};
