FROM golang:1.23 AS build
WORKDIR /.
# Copy dependencies list
COPY go.mod go.sum ./
# Build with optional lambda.norpc tag
COPY tos.go .
RUN go build -tags lambda.norpc -o tos tos.go
# Copy artifacts to a clean image
FROM public.ecr.aws/lambda/provided:al2023
COPY --from=build /tos ./tos
ENTRYPOINT [ "./tos" ]
