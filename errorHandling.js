            // setting up DOM constants
            const scopes = document.getElementById("scopes")
            const clearButton = document.getElementById("clear")
            const fileButton = document.getElementById("upload-csv")

            // defining scope constants
            const lightReviewScopes = ["Calls:write", "im:write", "channels:join", "mpim:history", "channels:manage", "groups:write", "remote_files:share", "pins:read", "admin.analytics:read", "admin.conversations:write", "admin.teams:read", "admin.apps:read", "admin.usergroups:read", "im:history", "links:read", "usergroups:write", "users.profile:write:user", "remote_files:read", "channels:write", "channels:history", "groups:history", "auditlogs:read", "chat:write.public", "search:read", "chat:write:user", "users.profile:write", "chat:write", "client", "read", "workflow.steps:execute", "commands", "pins:write"].map(element => {
            return element.toLowerCase()
             })

            const deepReviewScopes = ["remote_files:write", "files:read", "admin", "admin.users:write", "admin.apps:write", "admin.barriers:write", "admin.invites:read", "admin.usergroups:write", "admin.invites:write", "admin.teams:write", "files:write:user", "files:write"].map(element => {
                return element.toLowerCase()
            })

            const noReviewScopes = ["read","emoji:read", "channels:read", "reactions:write", "usergroups:read", "users:read", "users:read.email", "im:read", "incoming-webhook", "calls:read", "links:write", "reminders:write", "users:write", "admin.barriers:read", "identity.avatar", "identity.email", "identity.team", "admin.users:read", "dnd:write", "chat:write:bot", "admin.conversations:read", "bot", "chat:write.customize", "dnd:write:user", "identity:read:user", "identity.avatar:read:user", "identity.basic", "identity.email:read:user", "identity.team:read:user", "mpim:read", "groups:read", "post", "reminders:read", "reminders:read:user", "reminders:write:user", "stars:read", "stars:write", "team:read", "users.profile:read", "users.profile:write", "im:write", "identify", "reactions:read", "app_mentions:read"].map(element => {
                return element.toLowerCase()
            })

            // clear button resets scope message
            clearButton.addEventListener("click", () => {
                scopes.innerText = "Please choose a file"
                fileButton.value = null
            })

            // parsing function

            const getCSV = function(result) {
                // converting returned value to a string 
                let finalArray = result.data[1].toString().toLowerCase().split(",")
                console.log(finalArray)
                // functions to compare finalArray against review scopes
                const deepReviewCheck = finalArray.some(value => deepReviewScopes.includes(value))
                const lightReviewCheck = finalArray.some(value => lightReviewScopes.includes(value))
                const noReviewCheck = finalArray.some(value => noReviewScopes.includes(value))

                try {
                    if (deepReviewCheck) {
                        scopes.innerText = "This app requires a deep review"
                        console.log(deepReviewCheck)
                    } else if (lightReviewCheck) {
                        scopes.innerText = "This app requires a light review"
                    } else if (noReviewCheck) {
                        scopes.innerText = "This app doesn't require a review"
                    } else {
                        throw scopes.innerText = "Please choose a file with scopes"
                    }
                }

                catch(e) {
                    console.error("This file doesn't have any scopes in it")
                }    
            }

            // adding event listener to "read CSV" button
            const btnUpload = document.getElementById("btn-upload-csv").addEventListener("click", function() {
                
                    // using built-in files api to read file uploaded to localStorage
                    Papa.parse(document.getElementById('upload-csv').files[0], {
                        download: false,
                        header: false,
                        complete: getCSV
                    })
                



            })

