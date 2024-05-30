import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dtos/createPost.dto";
import { UpdatePostDto } from "./dtos/updatePost.dto";

@Controller('posts')
export class PostController{
    constructor(private postService : PostService){}

    @Get()
    findAll(){
        return this.postService.findAll();
    }

    @Get(':id')
    @UsePipes(new ValidationPipe())
    find(@Param('id',ParseIntPipe) id:number){
        return this.postService.findById(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() createPost : CreatePostDto){
        return this.postService.create(createPost);
    }

    @Put(":id")
    update(@Param('id',ParseIntPipe) id:number,@Body() updatePost : UpdatePostDto){
        return this.postService.update(id,updatePost);
    }

    @Delete(':id')
    delete(@Param('id',ParseIntPipe) id:number){
        return this.postService.delete(id);
    }    
}