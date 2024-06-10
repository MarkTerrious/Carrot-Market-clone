import { streamingTest } from "./action";
import TestHtml from "./pageHtml";

export default async function Test()
{
    (()=> {
        streamingTest();
    })();

    return(
        <TestHtml />
    )
}