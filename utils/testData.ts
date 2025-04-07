export interface Pet {
    id?: number;
    category?: {
        id: number;
        name: string;
    };
    name: string;
    photoUrls: string[];
    tags?: {
        id: number;
        name: string;
    }[];
    status?: 'available' | 'pending' | 'sold';
}

export const petData: Pet[] = [
    {
        id: 1001,
        category: {
            id: 1001,
            name: "dog",
        },
        name: "Snickers",
        photoUrls: ["http://photo.url/dog.jpg"],
        tags: [
            {
                id: 1001,
                name: "black",
            },
        ],
        status: "available",
    },
    {
        id: 1002,
        name: "Whiskers",
        photoUrls: ["http://photo.url/cat.jpg"],
    },
]