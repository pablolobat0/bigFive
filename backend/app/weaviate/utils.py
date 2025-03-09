from datetime import datetime
from typing import List, Dict, Literal
import weaviate.classes.query as wq
import numpy as np

from app.models.diary import DiaryEntry
from .client import get_weaviate_client

RFC3339_FORMAT = "%Y-%m-%dT%H:%M:%S.%fZ"


def add_diary_entry(user_id: str, title: str, content: str):
    """
    Agrega una entrada del diario a Weaviate.

    Args:
        user_id (str): El ID del usuario.
        title (str): El título de la entrada.
        content (str): El contenido de la entrada.
    """
    client = get_weaviate_client()
    try:
        entry = {
            "user_id": user_id,
            "title": title,
            "content": content,
            "date": datetime.now().strftime(RFC3339_FORMAT),
        }
        client.collections.get("DiaryEntry").data.insert(entry)
    finally:
        client.close()


def get_user_entries_vectors(user_id: str):
    client = get_weaviate_client()
    try:
        entries = client.collections.get("DiaryEntry")
        response = entries.query.fetch_objects(
            limit=100,
            filters=wq.Filter.by_property("user_id").equal(user_id),
            sort=wq.Sort.by_property("date", ascending=True),
            include_vector=True,
        )

        valid_embeddings = []
        for entry in response.objects:
            # Suponiendo que entry es un diccionario y el vector está en entry["vector"]
            vector = entry.vector
            # Verificar que vector sea una lista o similar
            valid_embeddings.append(np.array(vector["default"]))
        return valid_embeddings

    finally:
        client.close()


def get_user_entries_text(user_id: str) -> list[DiaryEntry]:
    client = get_weaviate_client()
    try:
        entries = client.collections.get("DiaryEntry")
        response = entries.query.fetch_objects(
            limit=100,
            filters=wq.Filter.by_property("user_id").equal(user_id),
            sort=wq.Sort.by_property("date", ascending=True),
        )

        diary_entries = []
        for entry in response.objects:
            DiaryEntry(
                titulo=str(entry.properties["title"]),
                entrada=str(entry.properties["content"]),
            )
        return diary_entries

    finally:
        client.close()


def get_user_entries_by_query(user_id: str, query) -> str:
    client = get_weaviate_client()
    try:
        print(f"Query {query}")
        entries = client.collections.get("DiaryEntry")
        response = entries.query.bm25(
            query=query,
            filters=wq.Filter.by_property("user_id").equal(user_id),
            limit=5,
            query_properties=["content"],
        )

        context_text = ""
        for object in response.objects:
            context_text += f"Título: {str(object.properties.get("title"))} Contenido: {object.properties.get("content")} Fecha: {object.properties.get("date")}\n"

        return context_text
    finally:
        client.close()


def add_chat_message(user_id: str, text: str, author: str):
    """
    Agrega un mensaje de chat a Weaviate.

    Args:
        user_id (str): El ID del usuario.
        text (str): El contenido del mensaje.
        author (str): El autor del mensaje (user o assistant).

    Returns:
        str: El ID del objeto creado en Weaviate.
    """
    client = get_weaviate_client()
    try:
        message = {
            "user_id": user_id,
            "text": text,
            "date": datetime.now().strftime(RFC3339_FORMAT),
            "author": author,
        }
        client.collections.get("ChatMessage").data.insert(message)
    finally:
        client.close()


def get_chat_history_embbeding(user_id: str):
    client = get_weaviate_client()
    try:
        messages = client.collections.get("ChatMessage")
        response = messages.query.fetch_objects(
            limit=100,
            filters=wq.Filter.all_of(
                [
                    wq.Filter.by_property("user_id").equal(user_id),
                    wq.Filter.by_property("author").equal("user"),
                ]
            ),
            sort=wq.Sort.by_property("date", ascending=True),
            include_vector=True,
        )

        valid_embeddings = []
        for entry in response.objects:
            vector = entry.vector
            valid_embeddings.append(np.array(vector["default"]))
        return valid_embeddings

    finally:
        client.close()


def get_chat_history(user_id: str) -> List[Dict[Literal["role", "content"], str]]:
    """
    Recupera el historial de la conversación para un usuario desde Weaviate.

    Args:
        user_id (str): El ID del usuario.

    Returns:
        List[Dict[Literal["role", "content"], str]]: Una lista de mensajes en formato de historial de chat.
    """
    client = get_weaviate_client()
    try:
        messages = client.collections.get("ChatMessage")
        response = messages.query.fetch_objects(
            limit=100,
            filters=wq.Filter.by_property("user_id").equal(user_id),
            sort=wq.Sort.by_property("date", ascending=True),
        )

        return [
            {
                "role": str(msg.properties["author"]),
                "content": str(msg.properties["text"]),
            }
            for msg in response.objects
        ]

    finally:
        client.close()
