import { AxiosResponse } from "axios";
import { apiClient } from "../utils/apiClient";
import { petData } from "../utils/testData";

/*
    * Test suite is run sequentially since tests are dependent on each other.
    * The first test creates a pet and the second test retrieves the created pet.
*/

describe("Pet API", () => {
    let petId: number;

    const petData = {
        category: {
            id: 123,
            name: "dog",
        },
        name: "Snickers",
        photoUrls: ["http://photo.url/dog.jpg"],
        tags: [
            {
                id: 123,
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

    test("Get the created pet - negative", async () => {
        const petId = 999999;
        let response: AxiosResponse<any, any>;
        try {
            response = await apiClient.get(`/pet/${petId}`);
        }
        catch (error: any) {
            expect(error.response.status).toBe(404);
            expect(error.response.data.message).toBe("Pet not found");
        }
    });
});

describe("Pet API - optional fields validation", () => {
    test.each(petData)("Create a new pet - %s", async (pet) => {
        const response = await apiClient.post("/pet", pet);
        expect(response.status).toBe(200);
    });

    test.each(petData.map(pet => [pet.id, pet]))
        ("Get the created pet - %i", async (id, pet) => {
            const response = await apiClient.get(`/pet/${id}`);
            expect(response.status).toBe(200);
            expect(response.data.id).toBe(pet.id);
            expect(response.data.name).toBe(pet.name);
            expect(response.data.photoUrls).toEqual(pet.photoUrls);
            if (pet.category) {
                expect(response.data.category).toMatchObject(pet.category);
            }
            if (pet.tags) {
                expect(response.data.tags).toEqual(expect.arrayContaining(pet.tags));
            }
            if (pet.status) {
                expect(response.data.status).toBe(pet.status);
            }
        });
});