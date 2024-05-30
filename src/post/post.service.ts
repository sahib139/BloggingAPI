import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "./entities/post.entity";
import { Repository } from "typeorm";
import { CreatePostDto } from "./dtos/createPost.dto";
import { UpdatePostDto } from "./dtos/updatePost.dto";

@Injectable()
export class PostService{
    
    constructor(@InjectRepository(Post) private readonly postRepository:Repository<Post>){}
    
    async findById(id:number){
        try {
            const post = await this.postRepository.findOneBy({id});
            return {
                data:post,
                status:HttpStatus.OK,
            }
        } catch (error) {
            return {
                message:error.message,
                status : HttpStatus.NOT_FOUND,
            }
        }
    }

    async findAll(){
        try {
            const posts = await this.postRepository.find({});
            return {
                data:posts,
                status:HttpStatus.OK,
            }
        } catch (error) {
            return {
                message:'No post found',
                status:HttpStatus.NOT_FOUND,
            }
        }
    }

    async create(createPost : CreatePostDto){
        try {
            const newPost = await this.postRepository.create(createPost);
            const newPostCreated = await this.postRepository.save(newPost);
            return {
                data:newPostCreated,
                status:HttpStatus.CREATED,
            }
        } catch (error) {
            return {
                message:error.message,
                status:HttpStatus.INTERNAL_SERVER_ERROR
            }
        }
    }

    async update(id:number,updatePost:UpdatePostDto){
        try {
            const post = await this.postRepository.findOneBy({id});   
            if(!post){
                throw new HttpException('No post with given id',HttpStatus.BAD_REQUEST);
            }
            const updatedPost = await this.postRepository.update(id,updatePost);
            return {
                data:updatePost,
                status:HttpStatus.OK,
            }
        } catch (error) {
            return {
                message:error.message,
                status:HttpStatus.INTERNAL_SERVER_ERROR,
            }
        }
    }

    async delete(id:number){
        try {
            const post = await this.postRepository.findOneBy({id});   
            if(!post){
                throw new HttpException('No post with given id',HttpStatus.BAD_REQUEST);
            }
            await this.postRepository.delete(id);
            return {
                message:"Post deleted successfully",
                status:HttpStatus.OK,
            }
        } catch (error) {
            return {
                message:error.message,
                status:HttpStatus.INTERNAL_SERVER_ERROR,
            }
        }
    }

}