"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = void 0;
const common_1 = require("@nestjs/common");
const blog_service_1 = require("./blog.service");
const create_blog_dto_1 = require("./dto/create-blog.dto");
const update_blog_dto_1 = require("./dto/update-blog.dto");
const response_interceptor_1 = require("../common/interceptors/response.interceptor");
let BlogController = class BlogController {
    constructor(blogService) {
        this.blogService = blogService;
    }
    create(createBlogDto) {
        return this.blogService.create(createBlogDto);
    }
    findAll(page, itemsPerPage, keyword) {
        return this.blogService.findAll({
            keyword: keyword || "",
            page: Number(page) || 1,
            itemsPerPage: Number(itemsPerPage) || 3,
        });
    }
    findByCategory(categoryId, itemsPerPage, page) {
        return this.blogService.findByCategory({
            categoryId: +categoryId,
            page: Number(page) || 1,
            itemsPerPage: Number(itemsPerPage) || 3,
        });
    }
    findOne(id) {
        return this.blogService.findOne(id);
    }
    update(id, updateBlogDto) {
        return this.blogService.update(+id, updateBlogDto);
    }
    remove(id) {
        return this.blogService.remove(+id);
    }
};
exports.BlogController = BlogController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)(new response_interceptor_1.ResponseInterceptor("Create Blog Success")),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_blog_dto_1.CreateBlogDto]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseInterceptors)(new response_interceptor_1.ResponseInterceptor("Get Blog Success")),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('itemsPerPage')),
    __param(2, (0, common_1.Query)('keyword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("category/:categoryId"),
    (0, common_1.UseInterceptors)(new response_interceptor_1.ResponseInterceptor("Get Blog Success")),
    __param(0, (0, common_1.Param)('categoryId')),
    __param(1, (0, common_1.Query)('itemsPerPage')),
    __param(2, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "findByCategory", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseInterceptors)(new response_interceptor_1.ResponseInterceptor("Get Blog Success")),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_blog_dto_1.UpdateBlogDto]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "remove", null);
exports.BlogController = BlogController = __decorate([
    (0, common_1.Controller)('api/v1/blog'),
    __metadata("design:paramtypes", [blog_service_1.BlogService])
], BlogController);
//# sourceMappingURL=blog.controller.js.map