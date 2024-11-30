FROM public.ecr.aws/docker/library/golang:1.23 as build-image
WORKDIR /src
COPY google-cloud-api-key.json /src/google-cloud-api-key.json  
COPY go.mod go.sum main.go ./
RUN go build -o tos-handler

FROM public.ecr.aws/lambda/provided:al2023
COPY --from=build-image /src/tos-handler .
COPY --from=build-image /src/google-cloud-api-key.json /google-cloud-api-key.json 
ENV GOOGLE_APPLICATION_CREDENTIALS=/google-cloud-api-key.json
ENTRYPOINT ["./tos-handler"]
