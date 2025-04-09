import { AxiosResponse } from "axios";
import { apiClient } from "../utils/apiClient";
import { petData } from "../utils/testData";

/*
    * Tests in each file are run sequentially.
    * Each test file is run in a separate process in parallel.
    * Use test.concurrent() to run tests in parallel within a file. 
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
