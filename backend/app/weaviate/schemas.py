import weaviate.classes.config as wc
from weaviate.client import WeaviateClient


def create_diary_schema(client: WeaviateClient):
    client.collections.create(
        name="DiaryEntry",
        properties=[
            wc.Property(name="user_id", data_type=wc.DataType.TEXT),
            wc.Property(name="title", data_type=wc.DataType.TEXT),
            wc.Property(name="content", data_type=wc.DataType.TEXT),
            wc.Property(name="date", data_type=wc.DataType.DATE),
        ],
        # Define the vectorizer module
        vectorizer_config=wc.Configure.Vectorizer.text2vec_transformers(),
    )

    client.close()


def create_chat_schema(client: WeaviateClient):
    """
    Crea el esquema para los mensajes del chat en Weaviate.
    """
    client.collections.create(
        name="ChatMessage",
        properties=[
            wc.Property(name="user_id", data_type=wc.DataType.TEXT),
            wc.Property(name="text", data_type=wc.DataType.TEXT),
            wc.Property(name="author", data_type=wc.DataType.TEXT),
            wc.Property(name="date", data_type=wc.DataType.DATE),
        ],
        # Define the vectorizer module
        vectorizer_config=wc.Configure.Vectorizer.text2vec_transformers(),
    )

    client.close()
