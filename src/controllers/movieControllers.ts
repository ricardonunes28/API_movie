import { Request, Response } from "express";
import { MovieModel } from "../models/Movie";
import Logger from "../../config/logger";

export async function createMovie(req: Request, res: Response) {
    try {
        const data = req.body;
        const movie = await MovieModel.create(data)
        return res.status(200).json(movie)
    } catch (e: any) {
        Logger.error(`Erro ao criar: ${e.message}`)
        return res.status(500).json({ error: "Por favor tente mais tarde" })
    }
}

export async function findMovieById(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const movie = await MovieModel.findById(id)

        if (!movie) {
            return res.status(404).json({ error: "O filme não existe" })
        }

        return res.status(200).json(movie)
    } catch (e: any) {
        Logger.error(`Erro no sistema: ${e.message}`)
    }
}

export async function getAllmovie(req: Request, res: Response) {
    try {
        const movie = await MovieModel.find()
        if (!movie) {
            return res.status(404).json({ error: "Erro ao encontrar filmes" })
        }

        return res.status(200).json(movie)

    } catch (e: any) {
        Logger.error(`Erro ao buscar registro: ${e.message}`)
    }
}

export async function updateMovie(req: Request, res: Response) {
    try {
        const id = req.params.id
        const data = req.body;
        const movie = await MovieModel.findById(id)
        if (!movie) {
            return res.status(404).json({ error: "O filme não exite" })
        }
        await MovieModel.updateOne({ _id: id }, data)

        return res.status(200).json(data)
    } catch (e: any) {
        Logger.error(`Erro ao editar registro: ${e.message}`)
        return res.status(500).json({ error: "Por favor tente mais tarde" })
    }
}



export async function removeMovie(req: Request, res: Response) {
    try {
        const id = req.params.id
        const movie = await MovieModel.findById(id)
        if (!movie) {
            return res.status(404).json({ error: "O filme não exite" })
        }
        await movie.delete()
        return res.status(200).json({ error: "Filme removido com sucesso" })

    } catch (e: any) {
        Logger.error(`Erro ao excluir registro: ${e.message}`)
        return res.status(500).json({ error: "Por favor tente mais tarde" })
    }

}




