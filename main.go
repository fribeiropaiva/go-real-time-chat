package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/pusher/pusher-http-go"
)

func main() {
    app := fiber.New()

		app.Use(cors.New())

		pusherClient := pusher.Client{
			AppID: "1455329",
			Key: "dc981e2fe3b975c6b9ab",
			Secret: "9eca026b6ed40c56a2e1",
			Cluster: "sa1",
			Secure: true,
		}

    app.Post("/api/messages", func(c *fiber.Ctx) error {
			var data map[string]string

			if err := c.BodyParser(&data); err != nil {
				return err
			}

			pusherClient.Trigger("chat", "message", data)

			return c.JSON([]string{})
    })

    app.Listen(":3001")
}