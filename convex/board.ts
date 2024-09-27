import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

const images = [
    "https://utfs.io/f/e1ace813-a8cf-4ca7-ab91-62185b1a5d03-18f.png",
    "https://utfs.io/f/0779a571-7e76-4369-a95a-2214cdc4674c-17n.png",
    "https://utfs.io/f/42f2dea8-faef-4c94-bb09-4639bd18c381-17l.png",
    "https://utfs.io/f/4c79c325-71eb-486f-b09e-89a0e5cae07b-17m.png",
    "https://utfs.io/f/42411a1f-198e-44b4-93e7-9d6363cbda5d-18j.png",
    "https://utfs.io/f/abedc3ef-705d-4077-9227-03ea50533c4c-17o.png",
    "https://utfs.io/f/07a791a0-c9f7-4a14-98d7-b2e49134a559-17q.png",
    "https://utfs.io/f/29a4a0da-6b01-4cec-978d-088b4decc8d4-18i.png",
    "https://utfs.io/f/87eefc45-4c9c-42db-a695-6c7de1051baa-1k.png",
    "https://utfs.io/f/e80d4697-caa9-427f-a617-8ee6c40ba761-17p.png",
    "https://utfs.io/f/2dcc40a2-1789-4eb6-b8df-93159aa16e77-18g.png",
    "https://utfs.io/f/c4eec0fe-8047-4076-a16b-c4e3cfc4798e-18h.png",
    "https://utfs.io/f/6aee88a1-c1c0-430a-9001-2ef81ea805ee-1f.png",
    "https://utfs.io/f/b987c400-b9fa-4fd3-9e37-96159f2a1ef3-18e.png",
    "https://utfs.io/f/104246a4-95be-4efb-bd7e-89f4baf1b67f-17r.png",
    "https://utfs.io/f/fdedc46f-9a7c-4a6f-a376-1f13a7bccede-18k.png",
    "https://utfs.io/f/38fa20f1-1623-496a-9a4d-28d1167efa7b-18l.png",
    "https://utfs.io/f/34f78f0e-9814-45e6-abb3-dc032435e426-17s.png",
];

export const create = mutation({
    args: {
        orgId: v.string(),
        title: v.string(),
    },
    handler: async (ctx, agrs) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity) {
            throw new Error("Unauthorized");
        }

        const randomImage = images[Math.floor(Math.random() * images.length)];

        const board = await ctx.db.insert("boards", {
            title: agrs.title,
            orgId: agrs.orgId,
            authorId: identity.subject,
            authorName: identity.name!,
            imageUrl: randomImage,
        });

        return board;
    },
});

export const remove = mutation({
    args: { id: v.id("boards") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity) {
            throw new Error("Unauhorized");
        }

        const userId = identity.subject;

        const existingFavorite = await ctx.db
            .query("userFavorites")
            .withIndex("by_user_board", (q) => 
                q
                    .eq("userId", userId)
                    .eq("boardId", args.id)
            )
            .unique();

        if(existingFavorite) {
            await ctx.db.delete(existingFavorite._id);
        }

        await ctx.db.delete(args.id);
    },
});

export const update = mutation({
    args: { id: v.id("boards"), title: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity) {
            throw new Error("Unauthorized");
        }

        const title = args.title.trim();

        if(!title) {
            throw new Error("Title is required");
        }

        if(title.length > 60) {
            throw new Error("Title cannot be longer than 60 characters");
        }

        const board = await ctx.db.patch(args.id, {
            title: args.title,
        });

        return board;
    },
});

export const favorite = mutation({
    args: { id: v.id("boards"), orgId: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity) {
            throw new Error("Unauthorized");
        }

        const board = await ctx.db.get(args.id);

        if(!board) {
            throw new Error("Board not found");
        }

        const userId = identity.subject;

        const existingFavorite = await ctx.db
            .query("userFavorites")
            .withIndex("by_user_board", (q) => 
                q
                    .eq("userId", userId)
                    .eq("boardId", board._id)
            )
            .unique();

        if(existingFavorite) {
            throw new Error("Board already favorited");
        }

        await ctx.db.insert("userFavorites", {
            userId,
            boardId:  board._id,
            orgId: args.orgId,
        });

        return board;
    }
});

export const unfavorite = mutation({
    args: { id: v.id("boards") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity) {
            throw new Error("Unauthorized");
        }

        const board = await ctx.db.get(args.id);

        if(!board) {
            throw new Error("Board not found");
        }

        const userId = identity.subject;

        const existingFavorite = await ctx.db
            .query("userFavorites")
            .withIndex("by_user_board", (q) => 
                q
                    .eq("userId", userId)
                    .eq("boardId", board._id)
            )
            .unique();

        if(!existingFavorite) {
            throw new Error("Favorited board not found");
        }

        await ctx.db.delete(existingFavorite._id);

        return board;
    }
});

export const get = query({
    args: { id: v.id("boards") },
    handler: async (ctx, args) => {
        const board = await ctx.db.get(args.id);

        return board;
    },
});