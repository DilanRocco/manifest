package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	texttospeech "cloud.google.com/go/texttospeech/apiv1"
	texttospeechpb "cloud.google.com/go/texttospeech/apiv1/texttospeechpb"
)

type RequestPayload struct {
	Text string
}

func SynthesizeSpeechHandler(w http.ResponseWriter, r *http.Request) {
	var reqPayload RequestPayload
	if err := json.NewDecoder(r.Body).Decode(&reqPayload); err != nil {
		http.Error(w, "Invalid JSON payload", http.StatusBadRequest)
		return
	}

	ctx := context.Background()

	c, err := texttospeech.NewClient(ctx)
	if err != nil {
		http.Error(w, "Failed to create Text-to-Speech client: "+err.Error(), http.StatusInternalServerError)
		return
	}
	defer c.Close()

	voice := &texttospeechpb.VoiceSelectionParams{
		LanguageCode: "en-US",
		SsmlGender:   1,
	}
	audioConfig := &texttospeechpb.AudioConfig{
		AudioEncoding: texttospeechpb.AudioEncoding(texttospeechpb.AudioEncoding_value["MP3"]),
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
		http.Error(w, "Failed to synthesize speech: "+err.Error(), http.StatusInternalServerError)
		return
	}
	w.Write(resp.AudioContent)

}

func main() {
	http.HandleFunc("/auth/tos", SynthesizeSpeechHandler)
	port := "8080"
	fmt.Printf("Server started on " + port)

	log.Fatal(http.ListenAndServe(":"+port, nil))
}
