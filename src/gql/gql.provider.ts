import { join } from "path";
import { GraphQLModule } from "@nestjs/graphql";
import { UserModule } from '../modules/user/user.module'
import { AuthModule } from '../modules/auth/auth.module'

export const gqlProvider = [
    GraphQLModule.forRoot({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        context: ({ req }) => ({ req }),
        include: [
            UserModule,
            AuthModule
        ]
    })
]