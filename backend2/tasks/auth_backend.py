from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import User
import jwt
from django.conf import settings

class NodeJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return None

        token = auth_header.split(' ')[1]
        try:
            decoded = jwt.decode(token, settings.JWT_SECRET, algorithms=['HS256'])
            user_id = decoded.get('id')
            username = decoded.get('username')

            # Try to get or create the user
            user, created = User.objects.get_or_create(
                id=user_id,
                defaults={'username': username}
            )
            return (user, None)
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token expired')
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Invalid token')
