import { queries, mutations } from "../../graphql/employe/index.js";
import { callApi } from "../commonApi.js";

function createEmployee() {
    let element = document.forms[0][0].value
    console.log(element);

    const data = JSON.stringify({
        query: mutations.employeMutation,
        variables: {
            input: {
                employe: {
                    employeName: document.forms[0][0].value,
                    employeEmail: document.forms[0][1].value,
                    employeCode: document.forms[0][2].value,
                }
            }
        }
    });

callApi(data)
}

//##########Mutation graphql###############

// query: mutations.employeMutation,
//     variables: {
//         input: {
//             employe: {
//                 employeCode: "230B",
//                 employeName: "Pradeep"
//               }
//         }
//     }

// ##############Get Values from graphql################

//   const data = JSON.stringify({
//     query: queries.getEmployes
//   });