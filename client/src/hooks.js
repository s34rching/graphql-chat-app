import {useMutation, useQuery, useSubscription} from "@apollo/react-hooks";
import {addMessageMutation, messageAddedSubscription, messagesQuery} from "./graphql/queries";

export function useChatMessages() {
    const { data } = useQuery(messagesQuery);
    useSubscription(messageAddedSubscription, {
        onSubscriptionData: ({ client, subscriptionData }) => {
            client.writeData({
                data: {
                    messages: messages.concat(subscriptionData.data.messageAdded),
                }
            })
        }
    })
    const [addMessage] = useMutation(addMessageMutation);
    const messages = data ? data.messages : [];

    return {
        messages,
        addMessage: (text) => addMessage({ variables: { input: { text } } })
    };
}