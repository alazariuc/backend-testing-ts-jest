import { AxiosResponse } from "axios";
import { apiClient } from "../utils/apiClient";
import { petData } from "../utils/testData";

/*
    * Tests in each file are run sequentially.
    * Each test file is run in a separate process in parallel.
    * Use test.concurrent() to run tests in parallel within a file. 
*/

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