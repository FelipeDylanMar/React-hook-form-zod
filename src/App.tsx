import { useState } from 'react';
import './styles/global.css';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const createUserFormSchema = z.object({
  name: z.string().nonempty('The name is required')
    //Transform usado para atualizar corretamente o nome de uma pessoa ao inserir os dados no formulário, transformando a primeira letra em upperCase.
    .transform(name => {
      return name.trim().split(' ').map(word => {
        return word[0].toLocaleUpperCase().concat(word.substring(1))
      }).join(' ')
    }),
  email: z.string().min(1, { message: 'The email is required' }),
  //  Caso queira adicionar um tipo específico de email usar .refine(email =>{
  //  return email.endsWith('@teste.com', 'O email precisa ser do tipo @teste.com')
  //  })
  // Isso vai fazer com que só aceite emails com o final '@teste.com'
  password: z.string().min(6, 'Password must be contain max 6 characters'),
  // techs: z.array(z.object({
  //   title: z.string().nonempty('O titulo é obrigatório'),
  //   knowLedge: z.number().min(1, 'O mínimo de caracteres é 1').max(100, 'O máximo de caracteres é 100')
  // }))
});
//Tipo criado para tipar nosso useForm, para inferir que o tipo dele vai ser createUserFormSchema, fazendo assim
//Ele reconhecer todos os campos dentro do createUserFormSchema.
type CreateUserFormData = z.infer<typeof createUserFormSchema>;

export function App() {
  const [output, setOutput] = useState('')
  const {
    register,
    handleSubmit,
    //formSate usado para reconhecer os erros de validação do formulário.
    formState: { errors },
    // control,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema)
  });

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: 'techs',
  // })

  function createUser(data: CreateUserFormData) {
    setOutput(JSON.stringify(data, null, 2))
  }

  return (
    <>
      <main className='h-screen bg-zinc-50 flex items-center justify-center flex-col gap-10'>
        <form onSubmit={handleSubmit(createUser)} className='flex flex-col gap-4 w-full max-w-xs'>

          <div className="flex flex-col gap-1">
            <label htmlFor="Name">
              Name
            </label>
            <input
              type="text"
              className='border border-sinc-200 shadow-sm rounded h-10 px-3'
              {...register('name')}
            />
            {errors.name &&
              <span className="text-red-600">
                {errors.name.message}
              </span>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="E-mail">
              Email
            </label>
            <input
              type="email"
              className='border border-sinc-200 shadow-sm rounded h-10 px-3'
              {...register('email')}
            />
            {errors.email &&
              <span className="text-red-600 ">
                {errors.email.message}
              </span>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="Password">
              Password
            </label>
            <input
              type="password"
              className='border border-sinc-200 shadow-sm rounded h-10 px-3'
              {...register('password')}
            />
            {errors.password &&
              <span className="text-red-600 ">
                {errors.password.message}
              </span>}
          </div>

          {/* <div className="flex flex-col gap-1">
            <label htmlFor="Password"> Tecnologias </label>

            {fields.map((field, index) => {
              return (
                <div key={field.id}>
                  <input
                    type="text"
                    className='border border-sinc-200 shadow-sm rounded h-10 px-3'
                    {...register(`techs.${index}.tittle`)}
                  />
                   <input
                    type="number"
                    className='border border-sinc-200 shadow-sm rounded h-10 px-3'
                    {...register('password')}
                  />
                </div>

              )
            })}
          </div> */}

          <button
            type='submit'
            className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600"
          >
            Salvar
          </button>
        </form>
        <pre>
          {output}
        </pre>
      </main>
    </>
  )
}

export default App
