import weaviate
from weaviate.client import WeaviateClient


def get_weaviate_client() -> WeaviateClient:
    return weaviate.connect_to_custom(
        http_host="weaviate",
        http_port=8080,
        http_secure=False,
        grpc_host="weaviate",
        grpc_port=50051,
        grpc_secure=False,
    )
