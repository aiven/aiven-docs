package main

import (
	"context"
	"fmt"

	"github.com/valkey-io/valkey-go"
)

var ctx = context.Background()

func main() {
	valkeyURI := "SERVICE_URI"

	client, err := valkey.NewClient(valkey.ClientOption{InitAddress: []string{valkeyURI}})
	if err != nil {
		panic(err)
	}
	defer client.Close()

	err = client.Do(ctx, client.B().Set().Key("key").Value("hello world").Nx().Build()).Error()
	if err != nil {
		panic(err)
	}

	value, err := client.Do(ctx, client.B().Get().Key("key").Build()).ToString()
	if err != nil {
		panic(err)
	}
	fmt.Println("The value of key is:", value)
}
