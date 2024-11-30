package main

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"

	texttospeech "cloud.google.com/go/texttospeech/apiv1"
	texttospeechpb "cloud.google.com/go/texttospeech/apiv1/texttospeechpb"
)

type RequestPayload struct {
	Text string `json:"text"`
}

func SynthesizeSpeechHandler(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	corsHeaders := map[string]string{
		"Access-Control-Allow-Origin":      "*",
		"Access-Control-Allow-Methods":     "POST, OPTIONS",
		"Access-Control-Allow-Credentials": "true",
		"Access-Control-Allow-Headers":     "Content-Type",
	}

	if request.HTTPMethod == "OPTIONS" {
		fmt.Println("We are in the options parts")
		return events.APIGatewayProxyResponse{
			StatusCode: 200,
			Headers:    corsHeaders,
			Body:       "",
		}, nil
	}

	var reqPayload RequestPayload

	if err := json.Unmarshal([]byte(request.Body), &reqPayload); err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 400,
			Headers:    corsHeaders,
			Body:       `{"error": "Invalid JSON payload"}`,
		}, nil
	}

	c, err := texttospeech.NewClient(ctx)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Headers:    corsHeaders,
			Body:       fmt.Sprintf(`{"error": "Failed to create Text-to-Speech client: %s"}`, err.Error()),
		}, nil
	}
	defer c.Close()

	voice := &texttospeechpb.VoiceSelectionParams{
		LanguageCode: "en-US",
		SsmlGender:   texttospeechpb.SsmlVoiceGender_NEUTRAL,
	}
	audioConfig := &texttospeechpb.AudioConfig{
		AudioEncoding: texttospeechpb.AudioEncoding_MP3,
	}
	input := &texttospeechpb.SynthesisInput{
		InputSource: &texttospeechpb.SynthesisInput_Text{Text: reqPayload.Text},
	}
	synthesisRequest := &texttospeechpb.SynthesizeSpeechRequest{
		Input:       input,
		AudioConfig: audioConfig,
		Voice:       voice,
	}

	resp, err := c.SynthesizeSpeech(ctx, synthesisRequest)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Headers:    corsHeaders,
			Body:       fmt.Sprintf(`{"error": "Failed to synthesize speech: %s"}`, err.Error()),
		}, nil
	}

	//audioBase64 := fmt.Sprintf(`{"audioContent": "%s"}`, resp.AudioContent)
	fmt.Println("We have an audiobase")
	audioContentBase64 := base64.StdEncoding.EncodeToString(resp.AudioContent)

	return events.APIGatewayProxyResponse{
		StatusCode: 200,

		Headers: map[string]string{
			"Content-Type":                     "application/json",
			"Access-Control-Allow-Origin":      "*",
			"Access-Control-Allow-Credentials": "true",
			"Access-Control-Allow-Methods":     "POST, OPTIONS",
			"Access-Control-Allow-Headers":     "Content-Type",
		},
		Body: fmt.Sprintf(`{"audioContent": "%s"}`, audioContentBase64),
	}, nil
}

func main() {
	// Start AWS Lambda handler
	lambda.Start(SynthesizeSpeechHandler)
}
