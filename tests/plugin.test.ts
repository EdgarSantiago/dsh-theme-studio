import assert from 'node:assert/strict'
import test from 'node:test'
import type { Context } from '@deepseek-ai/cordis'
import type { ToolRunContext } from '@deepseek-ai/dsh-tools'
import { apply, inject, name, saudarTool } from '../src/my-plugin.ts'

// Esta ferramenta não usa serviços do contexto de execução.
const exec = {} as ToolRunContext

test('cumprimenta a pessoa e remove espaços externos', async () => {
  assert.equal(await saudarTool.execute({ nome: ' Edgar ' }, exec), 'Olá, Edgar!')
})

test('rejeita nomes vazios', async () => {
  await assert.rejects(saudarTool.execute({ nome: '   ' }, exec), /nome não vazio/)
})

test('declara o plugin e sua dependência do registro de ferramentas', () => {
  assert.equal(name, 'meu-plugin')
  assert.deepEqual(inject, ['tools'])
})

test('registra a ferramenta no contexto fornecido pelo Harness', () => {
  const registered: unknown[] = []
  const ctx = {
    tools: { register: (tool: unknown) => registered.push(tool) },
  } as unknown as Context
  apply(ctx)
  assert.deepEqual(registered, [saudarTool])
})
