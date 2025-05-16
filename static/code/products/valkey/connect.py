import valkey

def main():
    valkey_uri = 'VALKEY_SERVICE_URI'  # Replace 'VALKEY_SERVICE_URI' with your actual Valkey service URI
    valkey_client = valkey.from_url(valkey_uri)

    valkey_client.set('key', 'hello world')
    key = valkey_client.get('key').decode('utf-8')

    print('The value of key is:', key)

if __name__ == '__main__':
    main()
