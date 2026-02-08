# MoviesApp

## Stack technologiczny - backend

Frontend: React, Vite, TypeScript, TailwindCSS
Backend: ASP.NET Core Web API (.NET 8), Clean Architecture, MediatR (CQRS), Entity Framework
Baza danych: Microsoft SQL Server localDB 

Aplikacja przy pierwszym uruchomieniu automatycznie:

* Tworzy bazę danych
* Wykonuje migracje
* Seeduje przykładowe dane (3 filmy + użytkownik)

## Uruchomienie backendu (pierwszy terminal)

1.  git clone https://github.com/adrjenes/MoviesApp
2.  cd MoviesApp/backend/MoviesApp.API
4.  dotnet restore
5.  dotnet run --launch-profile http

Backend uruchomi się na http://localhost:5081

## Uruchomienie frontendu (drugi terminal)

1. cd MoviesApp/frontend
2. npm install
3. npm run dev

Frontend uruchomi się na http://localhost:5173

## Dane do logowania:

Login: rekruter
Hasło: Rekruter123!@
