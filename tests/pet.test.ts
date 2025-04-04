import { apiClient } from "../utils/apiClient";

/*
    * Test suite is run sequentially since tests are dependent on each other.
    * The first test creates a pet and the second test retrieves the created pet.
*/

describe("Pet API", () => {
    let petId: number;

    const petData = {
        id: 0,
        category: {
            id: 0,
            name: "dog",
        },
        name: "Snickers",
        photoUrls: ["http://photo.url/dog.jpg"],
        tags: [
            {
                id: 0,
                name: "black",
            },
        ],
        status: "available",
    };

    test("Create a new pet", async () => {
        const response = await apiClient.post("/pet", petData);
        expect(response.status).toBe(200);
        expect(response.data.name).toBe("Snickers");
        petId = response.data.id;
    });

    test("Get the created pet", async () => {
        const response = await apiClient.get(`/pet/${petId}`);
        expect(response.status).toBe(200);
        expect(response.data.name).toBe("Snickers");
    });
});