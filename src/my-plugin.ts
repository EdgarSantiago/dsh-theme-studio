import type { Context } from '@deepseek-ai/cordis'
import { defineTool } from '@deepseek-ai/dsh-tools'

export const name = 'meu-plugin'
export const inject = ['tools']

export const saudarTool = defineTool({
  name: 'saudar',
  description: 'Cumprimenta uma pessoa pelo nome, em português.',
  parameters: {
    nome: {
      type: 'string',
      required: true,
      description: 'Nome da pessoa que deve receber o cumprimento.',
    },
  },
  output: {
    schema: { type: 'string' },
    render: (_args, value) => [{ type: 'text', text: value }],
  },
  async execute(args) {
    const nome = args.nome.trim()
    if (!nome) throw new Error('Informe um nome não vazio.')
    return `Olá, ${nome}!`
  },
})

export function apply(ctx: Context) {
  ctx.tools.register(saudarTool)
}
