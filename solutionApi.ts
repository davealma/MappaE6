import type { SolutionType } from "./MyTypes";

export async function PostSolution(values: SolutionType) {
    const url = `${process.env.API_URL}/v1/s1/e6/solution`;
    try {
        const resp = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json",
                "API-KEY": process.env.API_KEY                
            },
        });

        if (!resp.ok) {
            const error = await resp.json();
            throw new Error('Error: ', error);
        }
        console.log("The gates were open and responded with: ",resp.statusText);
    }
    catch(error) {
        console.log(error.message)
    }
}