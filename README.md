# MergePDF

Simple ASP.NET Core application to merge multiple PDF files into one. Provides a web form for uploading PDFs and returns a merged document.

## Prerequisites
- [.NET 7 SDK](https://dotnet.microsoft.com/en-us/download)
- [Docker](https://www.docker.com/) (optional, for containerization)

## Local Development
```bash
dotnet build
dotnet run
```
The application will listen on `http://localhost:5000` by default.

## Docker
Build and run the container:
```bash
docker build -t mergepdf .
docker run -p 8080:8080 mergepdf
```
The service will be accessible at `http://localhost:8080`.

## Deploy to Google Cloud Run
1. Build and push the container image:
   ```bash
   gcloud builds submit --tag gcr.io/PROJECT_ID/mergepdf
   ```
2. Deploy:
   ```bash
   gcloud run deploy mergepdf \
       --image gcr.io/PROJECT_ID/mergepdf \
       --platform managed \
       --region REGION \
       --allow-unauthenticated
   ```
Replace `PROJECT_ID` and `REGION` with your Google Cloud project ID and desired region.
